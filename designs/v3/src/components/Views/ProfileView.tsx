import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { DigitalTicket } from '../../types';
import { getUserTicketsFromFirestore } from '../../lib/firebase';
import { 
  User, 
  Ticket, 
  QrCode, 
  LogOut, 
  ShieldCheck, 
  Globe, 
  Sparkles, 
  CheckCircle2,
  Lock
} from 'lucide-react';

interface ProfileViewProps {
  onOpenAuth: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onOpenAuth }) => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [tickets, setTickets] = useState<DigitalTicket[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<DigitalTicket | null>(null);

  useEffect(() => {
    if (user) {
      setLoadingTickets(true);
      getUserTicketsFromFirestore(user.uid)
        .then((fetchedTickets) => {
          setTickets(fetchedTickets);
        })
        .catch(console.error)
        .finally(() => setLoadingTickets(false));
    }
  }, [user]);

  return (
    <div className="space-y-6 animate-fadeIn pb-20 md:pb-8">
      {/* Account Info Card */}
      <div className="bg-[#111114] border border-white/5 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-indigo-500/20 text-indigo-400 border-2 border-indigo-500 flex items-center justify-center font-black text-2xl shadow-xl">
              {user?.email ? user.email.charAt(0).toUpperCase() : <User className="w-8 h-8" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {user ? (user.isAnonymous ? 'Usuario Invitado (Prueba)' : user.email) : 'Sesión no iniciada'}
              </h2>
              <p className="text-xs text-emerald-400 font-semibold flex items-center space-x-1 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
                <span>{user ? 'Autenticado con Firebase Auth' : 'Regístrate para guardar tus billetes'}</span>
              </p>
            </div>
          </div>

          {user ? (
            <button
              onClick={() => logout()}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-red-400 border border-white/10 rounded-xl text-xs font-bold transition flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>{t('logoutBtn')}</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center space-x-2"
            >
              <Lock className="w-4 h-4" />
              <span>Iniciar Sesión / Registro</span>
            </button>
          )}
        </div>
      </div>

      {/* Language Selector in Profile */}
      <div className="bg-[#111114] border border-white/5 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <Globe className="w-4 h-4 text-indigo-400" />
          <span>Idioma de la Aplicación</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { code: 'ES', label: 'Español' },
            { code: 'CA', label: 'Català' },
            { code: 'EN', label: 'English' },
            { code: 'FR', label: 'Français' }
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code as any)}
              className={`py-3 rounded-xl text-xs font-bold border transition ${
                language === lang.code 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/20' 
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Purchased Tickets Section from Firebase Firestore */}
      <div className="bg-[#111114] border border-white/5 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <Ticket className="w-5 h-5 text-indigo-400" />
            <span>{t('myTickets')} ({tickets.length})</span>
          </h3>
          <span className="text-xs text-slate-400 font-semibold">Base de datos Firestore</span>
        </div>

        {loadingTickets ? (
          <div className="py-8 text-center text-xs text-slate-400">Cargando billetes guardados en Firestore...</div>
        ) : tickets.length === 0 ? (
          <div className="bg-white/5 rounded-2xl p-8 text-center space-y-3 border border-white/5">
            <Ticket className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm text-slate-300 font-bold">No tienes billetes digitales activos todavía</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Compra tus billetes digitales en la pestaña de Rutas Activas o en el Buscador de Líneas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tickets.map((tkt) => (
              <div
                key={tkt.id}
                onClick={() => setSelectedTicket(tkt)}
                className="bg-white/5 border border-white/10 hover:border-indigo-500/60 p-4 rounded-2xl cursor-pointer transition shadow-lg space-y-2 group"
              >
                <div className="flex justify-between items-center text-xs font-bold text-indigo-400">
                  <span>Ref: {tkt.id.slice(0, 10)}</span>
                  <span className="bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full uppercase text-[10px]">
                    {tkt.status}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-indigo-400 transition">
                  {tkt.origin} → {tkt.destination}
                </h4>
                <div className="flex justify-between text-xs text-slate-300 pt-1 border-t border-white/5">
                  <span>Pasajero: <strong className="text-white">{tkt.passengerName}</strong></span>
                  <span className="font-bold text-indigo-400">€{tkt.price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Ticket Modal preview */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111114] border border-indigo-500/50 rounded-3xl p-6 w-full max-w-md space-y-4 relative shadow-2xl">
            <button
              onClick={() => setSelectedTicket(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold text-white">Billete Digital Firestore</h3>
            <p className="text-xs text-indigo-400">{selectedTicket.origin} → {selectedTicket.destination}</p>
            
            <div className="bg-white p-4 rounded-2xl text-center text-slate-950">
              <QrCode className="w-32 h-32 mx-auto" />
              <span className="text-xs font-mono font-bold">{selectedTicket.qrCode}</span>
            </div>

            <button
              onClick={() => setSelectedTicket(null)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
