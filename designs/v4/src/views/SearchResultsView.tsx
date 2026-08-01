import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Filter, 
  Bell, 
  Clock, 
  Tag, 
  Bus, 
  MapPin, 
  ChevronRight, 
  Map, 
  CheckCircle2, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { BusRoute } from '../types';
import { DEMO_MAP_IMAGES } from '../data/mockData';

interface SearchResultsViewProps {
  routes: BusRoute[];
  searchOrigin: string;
  searchDestination: string;
  searchDate: string;
  onSelectRoute: (route: BusRoute) => void;
  onBookRoute: (route: BusRoute) => void;
  onViewLiveMap: () => void;
  onBack: () => void;
}

export const SearchResultsView: React.FC<SearchResultsViewProps> = ({
  routes,
  searchOrigin,
  searchDestination,
  searchDate,
  onSelectRoute,
  onBookRoute,
  onViewLiveMap,
  onBack
}) => {
  const [filterType, setFilterType] = useState<'all' | 'express' | 'regular'>('all');

  const filteredRoutes = routes.filter(r => {
    if (filterType === 'express') return r.type === 'EXPRESS';
    if (filterType === 'regular') return r.type === 'REGULAR';
    return true;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Search Header Bar */}
      <div className="flex items-center justify-between bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-indigo-600" />
          </button>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">
              {searchOrigin.split(' ')[0]} → {searchDestination.split(' ')[0]}
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              Hoy, Oct 24
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter Pills */}
          <div className="hidden sm:flex bg-slate-100 p-1 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-md transition-all ${
                filterType === 'all'
                  ? 'bg-white text-indigo-600 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterType('express')}
              className={`px-3 py-1 rounded-md transition-all ${
                filterType === 'express'
                  ? 'bg-white text-indigo-600 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Express
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Bento Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            MÁS RÁPIDO
          </span>
          <span className="text-xl font-bold text-slate-900 mt-0.5">
            1h 15m
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            MEJOR PRECIO
          </span>
          <span className="text-xl font-bold text-slate-900 mt-0.5">
            €9.45
          </span>
        </div>

        <div className="hidden md:flex bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex-col justify-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            SALIDAS
          </span>
          <span className="text-xl font-bold text-slate-900 mt-0.5">
            24 Diarias
          </span>
        </div>

        <div className="hidden md:flex bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex-col justify-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            DISTANCIA
          </span>
          <span className="text-xl font-bold text-slate-900 mt-0.5">
            98 km
          </span>
        </div>
      </section>

      {/* Service List */}
      <div className="space-y-4">
        {filteredRoutes.map((route) => {
          if (route.isNextBus) {
            /* Highlighted NEXT BUS Card with Indigo Accent */
            return (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative overflow-hidden bg-white border-2 border-indigo-600 rounded-xl p-5 shadow-sm"
              >
                {/* Next Bus Badge */}
                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-bl-lg font-bold text-[10px] uppercase tracking-wider">
                  PRÓXIMO AUTOBÚS
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded text-[10px] font-bold">
                        {route.type}
                      </span>
                      <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        A Tiempo
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <span className="block text-2xl font-bold text-slate-900">
                          {route.departureTime}
                        </span>
                        <span className="block text-xs font-medium text-slate-500">
                          {route.origin.split(' ')[0]}
                        </span>
                      </div>

                      <div className="flex flex-col items-center flex-1 px-2">
                        <span className="text-xs font-semibold text-slate-500">
                          {route.duration}
                        </span>
                        <div className="w-full h-[2px] bg-slate-200 relative my-2">
                          <div className="absolute -top-1 left-0 w-2.5 h-2.5 rounded-full bg-indigo-600" />
                          <div className="absolute -top-1 right-0 w-2.5 h-2.5 rounded-full border-2 border-indigo-600 bg-white" />
                        </div>
                        <span className="text-[11px] font-medium text-slate-400">Directo</span>
                      </div>

                      <div className="text-center">
                        <span className="block text-2xl font-bold text-slate-900">
                          {route.arrivalTime}
                        </span>
                        <span className="block text-xs font-medium text-slate-500">
                          {route.destination.split(' ')[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Book Button */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                    <span className="text-2xl font-bold text-slate-900">
                      €{route.price.toFixed(2)}
                    </span>
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={() => onSelectRoute(route)}
                        className="bg-slate-100 text-slate-700 px-3 py-2 rounded-lg font-semibold text-xs hover:bg-slate-200 transition-colors"
                      >
                        Ver Paradas
                      </button>
                      <button
                        onClick={() => onBookRoute(route)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-semibold text-xs uppercase tracking-wider shadow-xs transition-colors active:scale-95"
                      >
                        Reservar
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          }

          /* Standard Cards */
          const isDelayed = route.status === 'Delayed';

          return (
            <motion.div
              key={route.id}
              onClick={() => onSelectRoute(route)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-indigo-300 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        route.type === 'EXPRESS'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {route.type}
                    </span>

                    {isDelayed ? (
                      <span className="flex items-center gap-1 text-rose-600 text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                        {route.delayMinutes} min de retraso
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        A Tiempo
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      {isDelayed ? (
                        <>
                          <span className="block text-sm text-slate-400 line-through">
                            10:45
                          </span>
                          <span className="block text-xl font-bold text-rose-600">
                            10:57
                          </span>
                        </>
                      ) : (
                        <span className="block text-xl font-bold text-slate-900">
                          {route.departureTime}
                        </span>
                      )}
                      <span className="block text-xs text-slate-500">
                        {route.origin.split(' ')[0]}
                      </span>
                    </div>

                    <div className="flex flex-col items-center flex-1 px-4">
                      <span className="text-xs font-semibold text-slate-500">
                        {route.duration}
                      </span>
                      <div className="w-full h-[1px] bg-slate-200 relative my-2">
                        <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-slate-400" />
                        <div className="absolute -top-1 right-0 w-2 h-2 rounded-full border border-slate-400 bg-white" />
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {route.stopsCount === 0 ? 'Directo' : `${route.stopsCount} Paradas`}
                      </span>
                    </div>

                    <div className="text-center">
                      <span className="block text-xl font-bold text-slate-900">
                        {route.arrivalTime}
                      </span>
                      <span className="block text-xs text-slate-500">
                        {route.destination.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end pl-4 border-l border-slate-100 ml-4">
                  <span className="text-xl font-bold text-slate-900">
                    €{route.price.toFixed(2)}
                  </span>
                  {route.price < 10 && (
                    <span className="text-[10px] font-bold text-emerald-600 uppercase">
                      Más Económico
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-400 mt-2 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Map Preview Banner */}
      <section className="mt-8">
        <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md">
          <img
            src={DEMO_MAP_IMAGES.coastalMap}
            alt="Map preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center">
            <button
              onClick={onViewLiveMap}
              className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-[#002563] dark:text-blue-300 px-5 py-2.5 rounded-full font-bold text-xs shadow-xl flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <Map className="w-4 h-4 text-[#EB8E02]" />
              Ver Mapa Interactivo en Vivo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
