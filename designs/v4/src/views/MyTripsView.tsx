import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  QrCode, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  Plus, 
  Download, 
  Bus, 
  Clock, 
  Calendar, 
  Edit3,
  Lock,
  ChevronRight
} from 'lucide-react';
import { Ticket, TripHistoryItem } from '../types';
import { useAuth } from '../context/AuthContext';

interface MyTripsViewProps {
  tickets: Ticket[];
  history: TripHistoryItem[];
  onOpenQR: (ticket: Ticket) => void;
  onOpenAuth: () => void;
}

export const MyTripsView: React.FC<MyTripsViewProps> = ({
  tickets,
  history,
  onOpenQR,
  onOpenAuth
}) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'tickets' | 'history'>('tickets');

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Profile Header Card */}
      <section className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="relative">
          <div className="w-20 h-20 rounded-xl overflow-hidden ring-2 ring-indigo-600 shadow-xs">
            <img
              src={user?.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200'}
              alt={user?.displayName || 'User Profile'}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="text-center md:text-left flex-1 space-y-1">
          <h2 className="text-2xl font-bold text-slate-900">
            {user?.displayName || 'Mateo Rodriguez'}
          </h2>
          <p className="text-xs font-semibold text-slate-500">
            Viajero Frecuente • {user?.membershipTier || 'Gold Member'}
          </p>

          <div className="pt-2 flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 rounded-md text-xs font-bold">
              {user?.points || 840} Puntos acumulados
            </span>
            <span className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-md text-xs font-bold">
              Oferta Costa Daurada
            </span>
          </div>
        </div>

        <button
          onClick={onOpenAuth}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-semibold text-xs flex items-center gap-2 shadow-xs transition-colors active:scale-95"
        >
          <Edit3 className="w-4 h-4" />
          <span>Editar Perfil</span>
        </button>
      </section>

      {/* Active Tickets Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="text-lg font-bold text-slate-900">
            Billetes Activos
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            {tickets.length} Disponibles
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tickets.map((ticket) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-indigo-300 transition-all flex flex-col justify-between group"
            >
              <div className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase mb-2 inline-block">
                      {ticket.lineCode}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 leading-tight">
                      {ticket.origin} <br />→ {ticket.destination}
                    </h4>
                  </div>
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                </div>

                <div className="flex items-center gap-6 text-xs text-slate-500">
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">FECHA</p>
                    <p className="font-bold text-slate-900 mt-0.5">{ticket.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">SALIDA</p>
                    <p className="font-bold text-indigo-600 mt-0.5">{ticket.departureTime}</p>
                  </div>
                </div>
              </div>

              {/* Scan Barcode Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Nº de Pase</p>
                  <p className="text-xs font-mono font-bold text-slate-900 tracking-widest">
                    {ticket.passNumber}
                  </p>
                </div>

                <button
                  onClick={() => onOpenQR(ticket)}
                  className="bg-slate-900 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors active:scale-95"
                >
                  <QrCode className="w-4 h-4 text-amber-400" />
                  <span>Escanear QR</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Travel History & Payment Methods (Asymmetric Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {/* Travel History */}
        <section className="md:col-span-2 space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Historial de Trayectos
          </h3>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100">
            {history.map((item) => (
              <div
                key={item.id}
                className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-bold">
                    <Bus className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {item.origin} → {item.destination}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {item.date} • {item.time}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">
                    €{item.price.toFixed(2)}
                  </p>
                  <span className="text-[11px] font-bold text-emerald-600">
                    Completado
                  </span>
                </div>
              </div>
            ))}

            <button className="w-full py-3.5 text-center text-xs font-bold text-indigo-600 hover:bg-slate-50 transition-colors">
              Descargar Extracto de Billetes (PDF)
            </button>
          </div>
        </section>

        {/* Saved Payments & Security */}
        <section className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Métodos de Pago
          </h3>

          <div className="space-y-3">
            {/* Saved Visa Card */}
            <div className="bg-slate-900 text-white p-4 rounded-xl relative overflow-hidden shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <CreditCard className="w-6 h-6 text-slate-400" />
                <span className="text-xs font-mono tracking-widest text-slate-400">VISA</span>
              </div>
              <p className="text-sm font-mono tracking-widest font-bold">•••• •••• •••• 4291</p>
              <p className="text-[11px] text-slate-400 mt-1">Caduca 09/28</p>
            </div>

            {/* Apple Pay Button */}
            <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-5 bg-slate-900 rounded flex items-center justify-center text-white text-[10px] font-bold">
                  Pay
                </div>
                <span className="text-xs font-semibold text-slate-800">Apple Pay</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>

            {/* Add payment trigger */}
            <button className="w-full py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-xs font-semibold text-slate-500 hover:border-indigo-600 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              <span>Añadir Método de Pago</span>
            </button>

            {/* Security Notice */}
            <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl flex items-center gap-3 text-xs text-indigo-950">
              <Lock className="w-4 h-4 text-indigo-600 shrink-0" />
              <p className="text-[11px] leading-tight text-slate-600">
                <strong className="text-slate-900">Transacciones Seguras:</strong> Todos los billetes y pagos están protegidos por encriptación bancaria de Empresa Plana.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
