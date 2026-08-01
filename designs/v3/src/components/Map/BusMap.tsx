import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface BusMapProps {
  selectedLineId?: string;
  isDarkMode?: boolean;
  onBusClick?: () => void;
  busProgress?: number; // 0 to 100
}

export const BusMap: React.FC<BusMapProps> = ({
  isDarkMode = true,
  busProgress = 65,
  onBusClick
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const busMarkerRef = useRef<L.Marker | null>(null);

  // Route path coordinates (Tarragona -> Sitges -> Aeroport -> Barcelona)
  const routeCoords: [number, number][] = [
    [41.1189, 1.2449], // Tarragona
    [41.1578, 1.4012], // Torredembarra
    [41.2372, 1.8059], // Sitges
    [41.2974, 2.0785], // Aeroport El Prat T1
    [41.3851, 2.1734]  // Barcelona Sants / Centre
  ];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map if not created
    if (!mapRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [41.25, 1.7],
        zoom: 10,
        zoomControl: false
      });

      L.control.zoom({ position: 'topleft' }).addTo(map);

      // CartoDB Dark Matter tile layer or standard OpenStreetMap
      const tileUrl = isDarkMode 
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

      L.tileLayer(tileUrl, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19
      }).addTo(map);

      // Route polyline
      const polyline = L.polyline(routeCoords, {
        color: '#f59e0b',
        weight: 5,
        opacity: 0.9,
        lineCap: 'round'
      }).addTo(map);

      // Add stop markers
      const stopIcon = L.divIcon({
        className: 'custom-stop-icon',
        html: `<div class="w-7 h-7 rounded-full bg-slate-900 border-2 border-amber-500 shadow-lg flex items-center justify-center text-amber-400 font-bold text-xs">
          <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
        </div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const stopNames = ['Tarragona Estació', 'Torredembarra', 'Sitges Centro', 'Aeroport Barcelona T1', 'Barcelona Sants'];
      routeCoords.forEach((coord, idx) => {
        L.marker(coord, { icon: stopIcon })
          .addTo(map)
          .bindPopup(`<b>${stopNames[idx]}</b><br/>Línea 302 Express`);
      });

      // Custom Bus Icon
      const busDivIcon = L.divIcon({
        className: 'custom-bus-icon',
        html: `<div class="relative group cursor-pointer">
          <div class="absolute -inset-2 bg-amber-500/30 rounded-full animate-ping"></div>
          <div class="w-12 h-12 bg-amber-500 border-2 border-white rounded-full shadow-2xl flex items-center justify-center text-slate-950 font-black">
            <svg class="w-7 h-7 text-slate-950 fill-current" viewBox="0 0 24 24">
              <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
            </svg>
          </div>
        </div>`,
        iconSize: [48, 48],
        iconAnchor: [24, 24]
      });

      // Calculate initial bus position based on busProgress
      const busPos = getInterpolatedCoordinate(routeCoords, busProgress);
      const busMarker = L.marker(busPos, { icon: busDivIcon }).addTo(map);
      busMarker.bindPopup('<b>Autobús #302</b><br/>En trayecto a Barcelona<br/><i>ETA: 5 mins</i>');
      
      if (onBusClick) {
        busMarker.on('click', onBusClick);
      }

      busMarkerRef.current = busMarker;
      mapRef.current = map;

      // Fit bounds
      map.fitBounds(polyline.getBounds(), { padding: [50, 50] });
    }

    return () => {
      // Keep map alive or cleanup if unmounted
    };
  }, []);

  // Update bus marker position when progress changes
  useEffect(() => {
    if (busMarkerRef.current && routeCoords.length > 0) {
      const newPos = getInterpolatedCoordinate(routeCoords, busProgress);
      busMarkerRef.current.setLatLng(newPos);
    }
  }, [busProgress]);

  // Helper function to interpolate coordinates along polyline
  function getInterpolatedCoordinate(coords: [number, number][], percent: number): [number, number] {
    const totalSegments = coords.length - 1;
    const progressFactor = (percent / 100) * totalSegments;
    const segmentIndex = Math.min(Math.floor(progressFactor), totalSegments - 1);
    const subProgress = progressFactor - segmentIndex;

    const [lat1, lng1] = coords[segmentIndex];
    const [lat2, lng2] = coords[segmentIndex + 1];

    const lat = lat1 + (lat2 - lat1) * subProgress;
    const lng = lng1 + (lng2 - lng1) * subProgress;

    return [lat, lng];
  }

  return (
    <div className="relative w-full h-full min-h-[380px] rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
      <div ref={mapContainerRef} className="w-full h-full min-h-[380px] z-10" />
      
      {/* Map Header Overlay */}
      <div className="absolute top-4 left-14 z-20 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700/60 shadow-lg flex items-center space-x-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="text-xs font-semibold text-slate-200">OpenStreetMap Live Engine</span>
      </div>

      {/* Map Footer Attribution badge */}
      <div className="absolute bottom-2 right-2 z-20 bg-slate-950/80 backdrop-blur-xs px-2 py-1 rounded text-[10px] text-slate-400">
        Leaflet | © OpenStreetMap contributors
      </div>
    </div>
  );
};
