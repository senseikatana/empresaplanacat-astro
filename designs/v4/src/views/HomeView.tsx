import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Bus, 
  ArrowLeftRight, 
  Calendar, 
  Users, 
  Search, 
  History, 
  ChevronRight, 
  Star, 
  Map, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { BusRoute } from '../types';
import { DEMO_MAP_IMAGES } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

interface HomeViewProps {
  routes: BusRoute[];
  onSearchRoutes: (origin: string, destination: string, date: string) => void;
  onSelectRoute: (route: BusRoute) => void;
  onViewLiveMap: () => void;
  onViewTrips: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  routes,
  onSearchRoutes,
  onSelectRoute,
  onViewLiveMap,
  onViewTrips
}) => {
  const { user, toggleFavoriteRoute } = useAuth();

  const [tripType, setTripType] = useState<'one_way' | 'round_trip'>('one_way');
  const [origin, setOrigin] = useState('Barcelona Estació del Nord');
  const [destination, setDestination] = useState('Tarragona Estació d\'Autobusos');
  const [travelDate, setTravelDate] = useState('2026-10-24');
  const [passengers, setPassengers] = useState('1 Adulto');

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchRoutes(origin, destination, travelDate);
  };

  // Recent trips list
  const recentTrips = [
    { origin: 'Barcelona', destination: 'Tarragona', date: 'Ayer, 14:30', count: '2 Billetes' },
    { origin: 'Reus Airport', destination: 'Salou', date: 'Viernes pasado', count: '1 Billete' },
  ];

  // Favorite routes filter
  const favoriteRoutes = routes.filter(r => user?.favoriteRouteIds.includes(r.id) || r.isNextBus || r.id.includes('cambrils'));

  return (
    <div className="space-y-6 md:space-y-8 pb-10">
      {/* Hero Welcome Banner */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Bienvenido de nuevo, {user?.displayName?.split(' ')[0] || 'John'}
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-normal mt-1">
            Consulta los horarios y reservas en tiempo real para la red Costa Daurada.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200/80 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Todas las líneas operativas</span>
        </div>
      </section>

      {/* Main Search Card Form */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm relative overflow-hidden"
      >
        <form onSubmit={handleSearchSubmit} className="space-y-6 relative">
          {/* Trip type toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTripType('one_way')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                tripType === 'one_way'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Sólo Ida
            </button>
            <button
              type="button"
              onClick={() => setTripType('round_trip')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                tripType === 'round_trip'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Ida y Vuelta
            </button>
          </div>

          {/* Origin & Destination with Swap */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Origin */}
            <div className="md:col-span-5">
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                Origen
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-600" />
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="¿Dónde empieza tu viaje?"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
              </div>
            </div>

            {/* Swap button */}
            <div className="md:col-span-2 flex justify-center py-1">
              <button
                type="button"
                onClick={handleSwap}
                className="p-2.5 bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-600 rounded-lg border border-slate-200 transition-colors shadow-xs"
                title="Intercambiar Origen y Destino"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* Destination */}
            <div className="md:col-span-5">
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                Destino
              </label>
              <div className="relative">
                <Bus className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-600" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="¿A dónde vas?"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Date & Passengers & Search CTA */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-1">
            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                Fecha
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
              </div>
            </div>

            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                Pasajeros
              </label>
              <div className="relative">
                <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="1 Adulto">1 Adulto</option>
                  <option value="2 Adultos">2 Adultos</option>
                  <option value="1 Adulto, 1 Niño">1 Adulto, 1 Niño</option>
                  <option value="Joven / Estudiante">Joven / Estudiante</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-4 flex items-end">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-lg shadow-xs flex items-center justify-center gap-2 transition-colors active:scale-[0.99]"
              >
                <Search className="w-4 h-4" />
                <span>Buscar Rutas</span>
              </button>
            </div>
          </div>
        </form>
      </motion.section>

      {/* Bento Grid: Recent Trips + Favorites + Live Service Map */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Trips */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <History className="w-4 h-4 text-indigo-600" />
              Viajes Recientes
            </h3>
            <button
              onClick={onViewTrips}
              className="text-xs font-semibold text-indigo-600 hover:underline"
            >
              Ver Historial
            </button>
          </div>

          <div className="space-y-3">
            {recentTrips.map((trip, idx) => (
              <div
                key={idx}
                onClick={() => onSearchRoutes(trip.origin, trip.destination, travelDate)}
                className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer hover:border-indigo-300 transition-all hover:shadow-sm group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 font-bold">
                    <Bus className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm">
                      <span>{trip.origin}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      <span>{trip.destination}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {trip.date} • {trip.count}
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            ))}
          </div>
        </div>

        {/* Favorite Routes */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              Líneas Favoritas
            </h3>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3 shadow-sm">
            {favoriteRoutes.slice(0, 2).map((route) => (
              <div
                key={route.id}
                onClick={() => onSelectRoute(route)}
                className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-start gap-2.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavoriteRoute(route.id);
                    }}
                  >
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0 mt-0.5" />
                  </button>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      {route.origin} ↔ {route.destination}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Salida {route.departureTime} • {route.duration}
                    </p>
                  </div>
                </div>

                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-md border border-indigo-100">
                  {route.lineCode}
                </span>
              </div>
            ))}

            {/* Live Service Map Quick Banner */}
            <div
              onClick={onViewLiveMap}
              className="relative h-32 w-full rounded-lg overflow-hidden group cursor-pointer border border-slate-200 shadow-xs transition-transform active:scale-[0.99]"
            >
              <img
                src={DEMO_MAP_IMAGES.coastalMap}
                alt="Mapa Costa Daurada"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                <div className="flex items-center gap-1.5">
                  <Map className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-semibold">Mapa en Tiempo Real</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-500 text-white font-bold rounded-full">
                  GPS Activo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
