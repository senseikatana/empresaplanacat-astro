import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bus, AlertTriangle, Users, ChevronRight, Settings, Clock, User, Bell } from 'lucide-react';
import { ViewMode } from '../types';
import { useAuth } from '../context/AuthContext';
import { COMPANY_ANNOUNCEMENTS } from '../data/mockData';
import { IncidentsModal } from '../components/IncidentsModal';
import { PassengerLogModal } from '../components/PassengerLogModal';

interface DriverDashboardViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const DriverDashboardView: React.FC<DriverDashboardViewProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [passengerLogOpen, setPassengerLogOpen] = useState(false);
  const [activeAnnouncement, setActiveAnnouncement] = useState<string | null>(null);

  const driverName = user?.displayName || 'Marc - Conductor';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="p-4 sm:p-6 max-w-md mx-auto space-y-5 text-slate-100 pb-20"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden flex items-center justify-center">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={driverName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <User className="w-6 h-6 text-slate-300" />
            )}
          </div>
          <div>
            <h2 className="font-extrabold text-lg text-white leading-tight">
              Hola, {driverName}
            </h2>
            <span className="text-xs text-slate-400 font-semibold">Conductor</span>
          </div>
        </div>

        <button
          onClick={() => onNavigate('employee-auth')}
          className="p-2.5 text-blue-400 hover:text-white rounded-xl bg-slate-800 border border-slate-700 transition"
          title="Ajustes y cambio de rol"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Next Shift Card ("Próximo Turno") */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-blue-600 rounded-2xl text-white shadow-md shadow-blue-600/20">
            <Bus className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-white">Próximo Turno</h3>
        </div>

        <div className="space-y-1 pl-1">
          <h4 className="font-bold text-sm text-white">
            Ruta 12A: Plaza España - Estación Sur
          </h4>
          <p className="text-xs text-slate-300">Hoy, 14:30 - 18:00</p>
          <p className="text-xs text-slate-400">Autobús: <strong className="text-blue-400 font-extrabold">4056</strong></p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {/* Reportar Incidencia button */}
        <button
          onClick={() => setIncidentOpen(true)}
          className="w-full p-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-3xl flex items-center space-x-4 text-left transition shadow-sm group"
        >
          <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-md shadow-blue-600/20 group-hover:scale-105 transition">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-base text-white">Reportar Incidencia</span>
        </button>

        {/* Registro de Pasajeros button */}
        <button
          onClick={() => setPassengerLogOpen(true)}
          className="w-full p-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-3xl flex items-center space-x-4 text-left transition shadow-sm group"
        >
          <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-md shadow-blue-600/20 group-hover:scale-105 transition">
            <Users className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-base text-white">Registro de Pasajeros</span>
        </button>
      </div>

      {/* Company Announcements section */}
      <div className="space-y-2 pt-2">
        <h3 className="font-extrabold text-base text-white px-1">Anuncios de la Empresa</h3>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl divide-y divide-slate-800 overflow-hidden shadow-sm">
          {COMPANY_ANNOUNCEMENTS.map((item) => (
            <div key={item.id} className="p-4 hover:bg-slate-800/50 transition">
              <div
                onClick={() =>
                  setActiveAnnouncement(activeAnnouncement === item.id ? null : item.id)
                }
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="text-xs font-semibold text-slate-200">
                  {item.title} <span className="text-slate-400 font-normal">- {item.date}</span>
                </div>
                <ChevronRight
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    activeAnnouncement === item.id ? 'rotate-90 text-blue-400' : ''
                  }`}
                />
              </div>

              {activeAnnouncement === item.id && (
                <p className="mt-2.5 text-xs text-slate-300 bg-slate-800 p-3 rounded-2xl border border-slate-700/80 leading-relaxed">
                  {item.content}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <IncidentsModal
        isOpen={incidentOpen}
        onClose={() => setIncidentOpen(false)}
        defaultRoute="Ruta 12A: Plaza España - Estación Sur"
        defaultBus="4056"
      />

      <PassengerLogModal
        isOpen={passengerLogOpen}
        onClose={() => setPassengerLogOpen(false)}
      />
    </motion.div>
  );
};
