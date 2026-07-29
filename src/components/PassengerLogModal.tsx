import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, X, Plus, Minus, CheckCircle2 } from 'lucide-react';

interface PassengerLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PassengerLogModal: React.FC<PassengerLogModalProps> = ({ isOpen, onClose }) => {
  const [passengers, setPassengers] = useState(38);
  const [maxCapacity] = useState(55);
  const [submitted, setSubmitted] = useState(false);

  const occupancyPct = Math.round((passengers / maxCapacity) * 100);

  const handleSave = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 text-slate-100 shadow-2xl z-10"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-blue-400">
                <Users className="w-5 h-5" />
                <h3 className="font-extrabold text-base text-white">Registro de Pasajeros</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-extrabold text-base text-white">Conteo Actualizado</h4>
                <p className="text-xs text-slate-300">{passengers} pasajeros a bordo ({occupancyPct}%)</p>
              </div>
            ) : (
              <div className="mt-4 space-y-5">
                <div className="text-center bg-slate-800 rounded-2xl p-4 border border-slate-700/80">
                  <span className="text-xs text-slate-400 font-semibold">Ocupación Actual</span>
                  <div className="text-4xl font-black text-blue-400 my-2">{passengers}</div>
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden mt-1">
                    <div
                      className={`h-full transition-all duration-300 ${
                        occupancyPct > 90
                          ? 'bg-amber-500'
                          : occupancyPct > 75
                          ? 'bg-blue-400'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${occupancyPct}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1.5 block">
                    {occupancyPct}% del aforo total ({maxCapacity} plazas)
                  </span>
                </div>

                <div className="flex items-center justify-center space-x-3">
                  <button
                    onClick={() => setPassengers(Math.max(0, passengers - 1))}
                    className="w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center text-slate-200 transition active:scale-95"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setPassengers(Math.max(0, passengers - 5))}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-300 transition"
                  >
                    -5
                  </button>
                  <button
                    onClick={() => setPassengers(Math.min(maxCapacity, passengers + 5))}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-300 transition"
                  >
                    +5
                  </button>
                  <button
                    onClick={() => setPassengers(Math.min(maxCapacity, passengers + 1))}
                    className="w-12 h-12 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center text-white transition active:scale-95 shadow-md shadow-blue-600/20"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={handleSave}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition shadow-md shadow-blue-600/20"
                >
                  Guardar Registro
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
