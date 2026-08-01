import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode, Bus, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { Ticket } from '../types';

interface QRModalProps {
  ticket: Ticket | null;
  onClose: () => void;
}

export const QRModal: React.FC<QRModalProps> = ({ ticket, onClose }) => {
  if (!ticket) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-sm overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 text-center"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-300 text-xs font-bold rounded-full mb-4">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Ticket Válido • Escanéalo en el autobús
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
            {ticket.lineCode}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            {ticket.origin} → {ticket.destination}
          </p>

          {/* QR Container */}
          <div className="relative aspect-square w-full max-w-[220px] mx-auto bg-white p-4 rounded-2xl border-4 border-slate-100 dark:border-slate-800 shadow-inner flex items-center justify-center mb-6 overflow-hidden">
            <img
              src={ticket.qrCodeUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYyjFoSkTuVtc3Owi4_8-SPENccEWn8zDo8TMfKTxm9l6Tluj98y7AeIjfbCsMupqcPPQPGQUJ1KLNxE-qv8kQkpBTO_KS7-nUQNtCTyE06H-LWh3FYtQTK7nuNZUGKGk2gnDKMKzEyAlBBV4LkxGxuRKkbmn2YgviIxxsXNx7lZk6-P5RHcKhTFUpRWc8A1vjaW1ekLZeBf-BA0d1lajPdrhkChB4ArQjfky1lNLedH2HOKuobLO1WArD76OF3esr1QpO8RnI3fsX'}
              alt="QR Ticket Code"
              className="w-full h-full object-contain"
            />
            {/* Laser scanning effect */}
            <motion.div
              animate={{ y: [-100, 100, -100] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className="absolute inset-x-0 h-1 bg-amber-500/80 shadow-[0_0_12px_#EB8E02]"
            />
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span className="font-medium text-slate-400">Nº de Billetes / Pass:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{ticket.passNumber}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span className="font-medium text-slate-400">Salida / Validez:</span>
              <span className="font-bold text-[#002563] dark:text-blue-400">{ticket.departureTime}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span className="font-medium text-slate-400">Tipo de billete:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{ticket.passType}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-5 py-3 bg-[#002563] hover:bg-[#001847] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-[0.98]"
          >
            Cerrar Ticket
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
