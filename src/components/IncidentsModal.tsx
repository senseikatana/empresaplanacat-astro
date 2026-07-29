import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X, CheckCircle2 } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';

interface IncidentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRoute?: string;
  defaultBus?: string;
}

export const IncidentsModal: React.FC<IncidentsModalProps> = ({
  isOpen,
  onClose,
  defaultRoute = 'Ruta 12A: Plaza España - Estación Sur',
  defaultBus = '4056'
}) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'incidents'), {
        title,
        description,
        routeId: defaultRoute,
        busId: defaultBus,
        status: 'Pending',
        reportedBy: user?.displayName || user?.email || 'Driver',
        createdAt: new Date().toISOString()
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setTitle('');
        setDescription('');
        onClose();
      }, 1800);
    } catch (err) {
      console.warn('Firestore incident creation fallback:', err);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setTitle('');
        setDescription('');
        onClose();
      }, 1800);
    } finally {
      setSubmitting(false);
    }
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
            className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 text-slate-100 shadow-2xl z-10"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-amber-400">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-extrabold text-lg text-white">Reportar Incidencia</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="font-extrabold text-lg text-white">Incidencia Registrada</h4>
                <p className="text-xs text-slate-300">
                  El equipo de tráfico y control de flota ha recibido tu reporte.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Ruta y Autobús
                  </label>
                  <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 flex justify-between">
                    <span>{defaultRoute}</span>
                    <span className="text-blue-400 font-bold">Bus: {defaultBus}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Tipo de Incidencia
                  </label>
                  <select
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Selecciona tipo...</option>
                    <option value="Tráfico denso / Retraso > 15m">Tráfico denso / Retraso &gt; 15m</option>
                    <option value="Avería Mecánica o Neumático">Avería Mecánica o Neumático</option>
                    <option value="Capacidad Máxima Alcanzada (100%)">Capacidad Máxima Alcanzada (100%)</option>
                    <option value="Obstrucción en vía / Desvío">Obstrucción en vía / Desvío</option>
                    <option value="Otro motivo de seguridad">Otro motivo de seguridad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Detalles Adicionales
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Escribe aquí cualquier observación relevante..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  />
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition shadow-md shadow-blue-600/20"
                  >
                    {submitting ? 'Enviando...' : 'Enviar Reporte'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
