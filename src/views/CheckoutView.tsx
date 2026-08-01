import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bus, CreditCard, CheckCircle2, ShieldCheck, X, QrCode, ArrowLeft } from 'lucide-react';
import { ViewMode, BusRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface CheckoutViewProps {
  onNavigate: (view: ViewMode) => void;
  selectedRoute?: BusRoute | null;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  onNavigate,
  selectedRoute,
}) => {
  const { t } = useLanguage();
  const [passengers, setPassengers] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'bizum'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const routeOrigin = selectedRoute?.origin || 'Girona';
  const routeDest = selectedRoute?.destination || 'Aeroport';
  const routeTime = selectedRoute?.departureTime || '10:30 AM';
  const unitPrice = selectedRoute?.price || 6.50;
  const totalPrice = unitPrice * passengers;

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowConfirmation(true);
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="p-4 sm:p-6 max-w-xl mx-auto space-y-5 text-slate-100 pb-24"
    >
      {/* Route Summary Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm relative">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="text-sm text-slate-300 font-medium">
              <span className="text-slate-400">Route: </span>
              <strong className="text-white font-extrabold text-base">{routeOrigin} → {routeDest}</strong>
            </div>

            <div className="text-xs text-slate-300">
              <span className="text-slate-400">Date: </span>
              <strong className="text-slate-100 font-bold">Oct 26, 2023</strong>
            </div>

            <div className="text-xs text-slate-300">
              <span className="text-slate-400">Time: </span>
              <strong className="text-slate-100 font-bold">{routeTime}</strong>
            </div>

            <div className="text-xs text-slate-300 flex items-center gap-2 pt-1">
              <span className="text-slate-400">Passenger: </span>
              <div className="flex items-center space-x-2 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setPassengers(Math.max(1, passengers - 1))}
                  className="text-slate-400 hover:text-white font-bold text-xs px-1"
                >
                  -
                </button>
                <span className="text-white font-bold text-xs">{passengers} Adult</span>
                <button
                  type="button"
                  onClick={() => setPassengers(passengers + 1)}
                  className="text-slate-400 hover:text-white font-bold text-xs px-1"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400">
            <Bus className="w-8 h-8" />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Precio Total:</span>
          <span className="text-lg font-extrabold text-blue-400">€{totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="space-y-3">
        <h3 className="font-extrabold text-base text-white">Payment Method</h3>

        <div className="grid grid-cols-3 gap-3">
          {/* Card Option */}
          <div
            onClick={() => setPaymentMethod('card')}
            className={`relative p-4 rounded-2xl border flex flex-col items-center justify-center text-center cursor-pointer transition min-h-[110px] ${
              paymentMethod === 'card'
                ? 'border-blue-500 bg-slate-800 shadow-md shadow-blue-500/10'
                : 'border-slate-800 bg-slate-900 hover:border-slate-700'
            }`}
          >
            {paymentMethod === 'card' && (
              <div className="absolute top-2.5 right-2.5 bg-blue-500 text-white rounded-full p-0.5">
                <CheckCircle2 className="w-4 h-4 fill-blue-500 text-slate-900" />
              </div>
            )}
            <CreditCard className="w-7 h-7 text-white mb-2" />
            <span className="text-xs font-bold text-slate-200 leading-tight">
              Tarjeta
            </span>
          </div>

          {/* PayPal Option */}
          <div
            onClick={() => setPaymentMethod('paypal')}
            className={`relative p-4 rounded-2xl border flex flex-col items-center justify-center text-center cursor-pointer transition min-h-[110px] ${
              paymentMethod === 'paypal'
                ? 'border-blue-500 bg-slate-800 shadow-md shadow-blue-500/10'
                : 'border-slate-800 bg-slate-900 hover:border-slate-700'
            }`}
          >
            {paymentMethod === 'paypal' && (
              <div className="absolute top-2.5 right-2.5 bg-blue-500 text-white rounded-full p-0.5">
                <CheckCircle2 className="w-4 h-4 fill-blue-500 text-slate-900" />
              </div>
            )}
            <span className="text-2xl font-black italic tracking-tighter text-blue-400 mb-1">
              PayPal
            </span>
            <span className="text-xs font-bold text-slate-300">PayPal</span>
          </div>

          {/* Bizum Option */}
          <div
            onClick={() => setPaymentMethod('bizum')}
            className={`relative p-4 rounded-2xl border flex flex-col items-center justify-center text-center cursor-pointer transition min-h-[110px] ${
              paymentMethod === 'bizum'
                ? 'border-blue-500 bg-slate-800 shadow-md shadow-blue-500/10'
                : 'border-slate-800 bg-slate-900 hover:border-slate-700'
            }`}
          >
            {paymentMethod === 'bizum' && (
              <div className="absolute top-2.5 right-2.5 bg-blue-500 text-white rounded-full p-0.5">
                <CheckCircle2 className="w-4 h-4 fill-blue-500 text-slate-900" />
              </div>
            )}
            <span className="text-2xl font-extrabold text-white tracking-tighter mb-1">
              %
            </span>
            <span className="text-xs font-bold text-slate-300">Bizum</span>
          </div>
        </div>
      </div>

      {/* Confirm Payment Button */}
      <div className="pt-2">
        <button
          onClick={handleConfirmPayment}
          disabled={isProcessing}
          className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base rounded-2xl transition shadow-md shadow-blue-600/20 active:scale-[0.99] flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <span>Procesando Pago Seguro...</span>
          ) : (
            <span>Confirmar Pago (€{totalPrice.toFixed(2)})</span>
          )}
        </button>
      </div>

      {/* Ticket Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 text-slate-100 shadow-2xl z-10 text-center space-y-4"
            >
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-extrabold text-xl text-white">¡Billete Confirmado!</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Empresa Plana - Localizador: <strong className="text-blue-400">EP-{Math.floor(100000 + Math.random() * 900000)}</strong>
                </p>
              </div>

              {/* QR Code Simulation */}
              <div className="bg-white p-4 rounded-2xl w-40 h-40 mx-auto flex flex-col items-center justify-center shadow-inner">
                <QrCode className="w-32 h-32 text-slate-900" />
              </div>

              <div className="text-xs text-slate-400 space-y-1.5 bg-slate-800/80 p-3.5 rounded-2xl text-left border border-slate-700/80">
                <p><strong className="text-slate-200">Trayecto:</strong> {routeOrigin} → {routeDest}</p>
                <p><strong className="text-slate-200">Hora:</strong> {routeTime} | {passengers} Pasajero(s)</p>
                <p><strong className="text-slate-200">Pago:</strong> {paymentMethod.toUpperCase()} (€{totalPrice.toFixed(2)})</p>
              </div>

              <button
                onClick={() => {
                  setShowConfirmation(false);
                  onNavigate('home');
                }}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition"
              >
                Volver al Inicio
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
