import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Info, Clock, AlertTriangle, ArrowRight, Bus } from 'lucide-react';
import { ViewMode, BusRoute } from '../types';
import { INITIAL_ROUTES } from '../data/mockData';

interface SearchResultsViewProps {
  onNavigate: (view: ViewMode) => void;
  onSelectRoute: (route: BusRoute) => void;
}

export const SearchResultsView: React.FC<SearchResultsViewProps> = ({
  onNavigate,
  onSelectRoute,
}) => {
  const [routes] = useState<BusRoute[]>(INITIAL_ROUTES);

  const handleRouteClick = (route: BusRoute) => {
    onSelectRoute(route);
    onNavigate('checkout');
  };

  const handleDetailsClick = (e: React.MouseEvent, route: BusRoute) => {
    e.stopPropagation();
    onSelectRoute(route);
    onNavigate('route-details');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="p-4 sm:p-6 max-w-2xl mx-auto space-y-5 text-slate-100"
    >
      <div className="flex items-center justify-between pb-1">
        <h2 className="font-extrabold text-xl text-white tracking-tight">Bus Search Results</h2>
        <span className="text-xs font-semibold text-slate-300 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
          {routes.length} Rutas
        </span>
      </div>

      {/* Notice Banner */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-xs text-amber-200 font-medium leading-relaxed">
        Tickets are only available for purchase on the bus or at the station.
      </div>

      {/* List of Bus Routes */}
      <div className="space-y-3.5">
        {routes.map((route) => (
          <div
            key={route.id}
            onClick={() => handleRouteClick(route)}
            className="bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-5 transition cursor-pointer shadow-sm group relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div>
                {/* Badge for Route Number */}
                <div className="inline-block bg-blue-600 text-white font-extrabold text-xs px-3 py-1 rounded-full mb-2.5 shadow-sm">
                  {route.number}
                </div>

                <div className="flex items-center space-x-2 text-sm text-slate-300 font-medium">
                  <span className="font-bold text-white">{route.departureTime}</span>
                  <span>-</span>
                  <span className="font-bold text-white">{route.arrivalTime}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400 text-xs">{route.duration}</span>
                </div>

                <div className="text-sm font-bold text-white mt-1 flex items-center gap-1.5">
                  <span>{route.origin}</span>
                  <span className="text-slate-500">→</span>
                  <span>{route.destination}</span>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <button
                  onClick={(e) => handleDetailsClick(e, route)}
                  className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
                  title="Ver detalles de paradas"
                >
                  <Info className="w-5 h-5" />
                </button>

                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                    route.status === 'On Time'
                      ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                      : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                  }`}
                >
                  {route.status === 'On Time' ? 'On Time' : 'Delayed (+12m)'}
                </span>

                <span className="text-sm font-extrabold text-blue-400 mt-1">
                  €{route.price.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-3.5 pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 group-hover:text-blue-300 transition">
              <span className="font-medium">Haz clic para seleccionar billete</span>
              <div className="flex items-center gap-1 font-bold text-blue-400">
                <span>Comprar / Reservar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
