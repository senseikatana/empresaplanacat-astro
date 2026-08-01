import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bus, 
  Users, 
  AlertTriangle, 
  Send, 
  Radio, 
  Clock, 
  ShieldAlert, 
  X, 
  CheckCircle2, 
  Activity,
  Sliders
} from 'lucide-react';
import { BusRoute, FleetAlert } from '../types';
import { INITIAL_FLEET_ALERTS } from '../data/mockData';

interface StaffDashboardViewProps {
  routes: BusRoute[];
}

export const StaffDashboardView: React.FC<StaffDashboardViewProps> = ({ routes }) => {
  const [alerts, setAlerts] = useState<FleetAlert[]>(INITIAL_FLEET_ALERTS);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [affectedLine, setAffectedLine] = useState('Todas las líneas');
  const [broadcastSentToast, setBroadcastSentToast] = useState(false);

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;

    const newAlert: FleetAlert = {
      id: `alt-${Date.now()}`,
      severity: 'warning',
      title: broadcastMessage,
      description: `Alerta oficial emitida para ${affectedLine}`,
      time: 'Ahora mismo',
      affectedLine
    };

    setAlerts([newAlert, ...alerts]);
    setShowBroadcastModal(false);
    setBroadcastMessage('');
    setBroadcastSentToast(true);
    setTimeout(() => setBroadcastSentToast(false), 4000);
  };

  return (
    <div className="space-y-6 pb-16 text-slate-900">
      {/* Toast Notification for Broadcast */}
      <AnimatePresence>
        {broadcastSentToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 bg-emerald-600 text-white rounded-xl font-semibold text-xs shadow-md flex items-center justify-between gap-3 border border-emerald-500"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Alerta emitida en tiempo real a todos los conductores y pasajeros.</span>
            </div>
            <button onClick={() => setBroadcastSentToast(false)}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Staff Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-[11px] font-bold text-indigo-600 tracking-wider uppercase">
            Centro de Operaciones Plana
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            Staff Fleet Dashboard
          </h2>
        </div>

        <button
          onClick={() => setShowBroadcastModal(true)}
          className="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs uppercase tracking-wider rounded-lg shadow-xs flex items-center justify-center gap-2 transition-colors active:scale-95"
        >
          <Radio className="w-4 h-4 animate-pulse" />
          <span>Emitir Alerta General</span>
        </button>
      </div>

      {/* Top Metrics Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Active Buses */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg font-bold border border-emerald-100">
            <Bus className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Autobuses Activos
            </span>
            <p className="text-2xl font-bold text-slate-900 mt-0.5">124</p>
          </div>
        </div>

        {/* Drivers on Duty */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg font-bold border border-indigo-100">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Conductores en Servicio
            </span>
            <p className="text-2xl font-bold text-slate-900 mt-0.5">87</p>
          </div>
        </div>

        {/* System Alerts */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-lg font-bold border border-rose-100">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Alertas del Sistema
            </span>
            <p className="text-2xl font-bold text-slate-900 mt-0.5">3 Críticas</p>
          </div>
        </div>

        {/* System Health */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-slate-100 text-slate-700 rounded-lg font-bold">
            <Activity className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Estado de Red
            </span>
            <p className="text-sm font-bold text-emerald-600 mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              98.4% En Hora
            </p>
          </div>
        </div>
      </section>

      {/* Active Fleet Routes Grid */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Bus className="w-4 h-4 text-indigo-600" />
          Monitor de Líneas en Curso
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {routes.map((route) => {
            const isDelayed = route.status === 'Delayed';
            const load = route.passengerLoadPercent || 75;

            return (
              <div
                key={route.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden p-5 shadow-sm space-y-4 hover:border-indigo-300 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      Ruta {route.lineCode} ({route.busId || 'Bus 102'})
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {route.origin.split(' ')[0]} - {route.destination.split(' ')[0]}
                    </p>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
                      isDelayed
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {isDelayed ? `Retrasado +${route.delayMinutes || 12}m` : 'En Hora'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>Horario: {route.departureTime} - {route.arrivalTime}</span>
                </div>

                {/* Capacity Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                    <span>Ocupación de Pasajeros</span>
                    <span className={load > 90 ? 'text-amber-600' : 'text-slate-600'}>
                      {load}% Capacidad
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        load > 90
                          ? 'bg-amber-500'
                          : isDelayed
                          ? 'bg-rose-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${load}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Broadcast Modal */}
      <AnimatePresence>
        {showBroadcastModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-xl p-6 max-w-md w-full shadow-2xl space-y-5"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-indigo-600">
                  <Radio className="w-5 h-5 animate-pulse" />
                  <h3 className="font-bold text-base text-slate-900">Emitir Alerta de Tráfico</h3>
                </div>
                <button
                  onClick={() => setShowBroadcastModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSendBroadcast} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">
                    Línea Afectada
                  </label>
                  <select
                    value={affectedLine}
                    onChange={(e) => setAffectedLine(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-semibold text-slate-800 outline-none"
                  >
                    <option value="Todas las líneas">Todas las líneas (Costa Daurada)</option>
                    <option value="Line E1.1">Line E1.1 (Express Tarragona-BCN)</option>
                    <option value="Line 45">Line 45 (Girona - Aeroport)</option>
                    <option value="Line L1">Line L1 (Cambrils - Tarragona)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">
                    Mensaje de la Alerta
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    placeholder="Ej. Obras en la autovía N-340. Posibles retrasos de 10 min en la ruta Cambrils."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs font-medium text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowBroadcastModal(false)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs uppercase rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Emitir Alerta</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
