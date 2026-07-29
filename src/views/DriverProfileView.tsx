import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wifi, Navigation, Heart, AlertTriangle, Star, Award, Bus } from 'lucide-react';
import { ViewMode } from '../types';
import { SayThanksModal } from '../components/SayThanksModal';
import { IncidentsModal } from '../components/IncidentsModal';

interface DriverProfileViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const DriverProfileView: React.FC<DriverProfileViewProps> = ({ onNavigate }) => {
  const [thanksOpen, setThanksOpen] = useState(false);
  const [incidentOpen, setIncidentOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="p-4 sm:p-6 max-w-md mx-auto space-y-5 text-slate-100"
    >
      <div className="text-left pb-1">
        <h2 className="font-extrabold text-xl text-white tracking-tight">Driver Profile</h2>
      </div>

      {/* Main Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-5 shadow-sm relative">
        {/* Driver Photo Avatar */}
        <div className="relative w-32 h-32 mx-auto">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80"
            alt="Carlos Gomez - Driver"
            className="w-32 h-32 rounded-full object-cover border-4 border-slate-800 shadow-xl"
            referrerPolicy="no-referrer"
          />
          <span className="absolute bottom-1 right-1 bg-emerald-500 w-5 h-5 rounded-full border-2 border-slate-900" title="En servicio" />
        </div>

        <div>
          <h3 className="font-extrabold text-2xl text-white">Carlos Gomez</h3>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Experience: <strong className="text-white">12 Years</strong>
          </p>
          <div className="flex items-center justify-center space-x-1.5 mt-1">
            <span className="text-xs text-slate-300 font-semibold">Rating: 4.8/5.0</span>
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>
        </div>

        <div className="border-t border-slate-800 pt-4 text-left space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Bus Details:
          </h4>
          <div className="text-sm font-semibold text-slate-300">
            Bus ID: <strong className="text-white font-extrabold text-base">102</strong>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex items-center space-x-2 text-xs text-blue-400 font-medium">
              <Wifi className="w-4 h-4 text-blue-400" />
              <span>Equipped with Free WiFi</span>
            </div>

            <div className="flex items-center space-x-2 text-xs text-blue-400 font-medium">
              <Navigation className="w-4 h-4 text-blue-400" />
              <span>GPS Tracking Active</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-3">
          <button
            onClick={() => setThanksOpen(true)}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-2xl transition shadow-md shadow-blue-600/20 active:scale-[0.99]"
          >
            Say Thanks
          </button>

          <button
            onClick={() => setIncidentOpen(true)}
            className="w-full py-3.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 font-bold text-sm rounded-2xl transition active:scale-[0.99]"
          >
            Report Issue
          </button>
        </div>
      </div>

      {/* Modals */}
      <SayThanksModal
        isOpen={thanksOpen}
        onClose={() => setThanksOpen(false)}
        driverName="Carlos Gomez"
        driverId="102"
      />

      <IncidentsModal
        isOpen={incidentOpen}
        onClose={() => setIncidentOpen(false)}
        defaultRoute="Route 22: Girona - Tarragona"
        defaultBus="102"
      />
    </motion.div>
  );
};
