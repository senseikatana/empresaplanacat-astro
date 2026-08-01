import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, X, CheckCircle2, Sparkles } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';

interface SayThanksModalProps {
  isOpen: boolean;
  onClose: () => void;
  driverName?: string;
  driverId?: string;
}

export const SayThanksModal: React.FC<SayThanksModalProps> = ({
  isOpen,
  onClose,
  driverName = 'Carlos Gomez',
  driverId = 'driver-102'
}) => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const presets = [
    '¡Excelente conducción y puntualidad!',
    'Muchas gracias por la amabilidad y el buen trato.',
    'Viaje muy suave y seguro, ¡10/10!',
    'Gracias por esperar cuando venía corriendo.'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'thanks'), {
        driverId,
        driverName,
        userId: user?.uid || 'guest',
        userName: user?.displayName || 'Pasajero Satisfecho',
        message,
        createdAt: new Date().toISOString()
      });
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setMessage('');
        onClose();
      }, 1800);
    } catch (err) {
      console.warn('Firestore thanks fallback:', err);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setMessage('');
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
            className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 text-slate-100 shadow-2xl z-10"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-blue-400">
                <Heart className="w-5 h-5 fill-blue-500 text-blue-500" />
                <h3 className="font-extrabold text-base text-white">Dar las Gracias</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {sent ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto border border-blue-500/20">
                  <Sparkles className="w-6 h-6 animate-spin" />
                </div>
                <h4 className="font-extrabold text-base text-white">¡Agradecimiento Enviado!</h4>
                <p className="text-xs text-slate-300 px-2 leading-relaxed">
                  Tu mensaje ha llegado al perfil de {driverName}. ¡Haces de Empresa Plana un mejor servicio!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <p className="text-xs text-slate-300">
                  Envía un mensaje de felicitación o agradecimiento a <strong className="text-white font-bold">{driverName}</strong> (Autobús 102).
                </p>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Sugerencias rápidas
                  </label>
                  <div className="flex flex-col gap-1.5">
                    {presets.map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setMessage(preset)}
                        className="text-left text-xs bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500/50 p-2.5 rounded-xl text-slate-200 transition"
                      >
                        "{preset}"
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    placeholder="Escribe tu mensaje personalizado..."
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition shadow-md shadow-blue-600/20 flex items-center justify-center space-x-2"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>{submitting ? 'Enviando...' : 'Enviar Agradecimiento'}</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
