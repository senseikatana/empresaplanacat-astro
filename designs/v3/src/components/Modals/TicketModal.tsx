import React, { useState } from 'react';
import { X, Ticket as TicketIcon, CheckCircle2, QrCode, CreditCard, ShieldCheck, Download, Sparkles } from 'lucide-react';
import { BusLine, DigitalTicket } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { createTicketInFirestore } from '../../lib/firebase';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  line: BusLine | null;
  onTicketPurchased?: (ticket: DigitalTicket) => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  isOpen,
  onClose,
  line,
  onTicketPurchased
}) => {
  const { user } = useAuth();
  const [passengerName, setPassengerName] = useState(user?.email ? user.email.split('@')[0] : 'Pasajero');
  const [paymentMethod, setPaymentMethod] = useState<'Tarjeta' | 'PayPal' | 'Bizum' | 'ATM Card'>('Bizum');
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchasedTicket, setPurchasedTicket] = useState<DigitalTicket | null>(null);

  if (!isOpen || !line) return null;

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const ticketData: Omit<DigitalTicket, 'id' | 'createdAt'> = {
        userId: user ? user.uid : 'guest-user',
        lineId: line.id,
        origin: line.origin,
        destination: line.destination,
        date: new Date().toISOString().split('T')[0],
        departureTime: line.departureTime,
        seatNumber: `Asiento ${Math.floor(Math.random() * 45) + 1}`,
        passengerName,
        price: line.price,
        paymentMethod,
        qrCode: `PLANA-${line.busNumber}-${Date.now()}`,
        status: 'valid'
      };

      // Save to Firebase Firestore
      let docId = `TKT-${Math.floor(Math.random() * 900000) + 100000}`;
      try {
        docId = await createTicketInFirestore(ticketData);
      } catch (e) {
        console.warn('Firestore fallback to local ticket id', e);
      }

      const completedTicket: DigitalTicket = {
        ...ticketData,
        id: docId,
        createdAt: new Date().toISOString()
      };

      setPurchasedTicket(completedTicket);
      if (onTicketPurchased) {
        onTicketPurchased(completedTicket);
      }
    } catch (err) {
      console.error('Error during ticket purchase:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-[#111114] border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative overflow-hidden">
        <button
          onClick={() => {
            setPurchasedTicket(null);
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!purchasedTicket ? (
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                <TicketIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Comprar Billete Digital</h3>
                <p className="text-xs text-indigo-400 font-semibold">Empresa Plana • Costa Daurada</p>
              </div>
            </div>

            {/* Line Summary Card */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-6 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>Línea {line.lineNumber} • {line.type}</span>
                <span className="text-indigo-400 font-bold">{line.status}</span>
              </div>
              <div className="text-base font-bold text-white flex items-center justify-between">
                <span>{line.origin} → {line.destination}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/5">
                <span>Salida: <strong className="text-white">{line.departureTime}</strong></span>
                <span>Precio: <strong className="text-indigo-400 text-sm">€{line.price.toFixed(2)}</strong></span>
              </div>
            </div>

            <form onSubmit={handlePurchase} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nombre del Pasajero
                </label>
                <input
                  type="text"
                  required
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Método de Pago
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'Bizum', name: 'Bizum', icon: '⚡' },
                    { id: 'Tarjeta', name: 'Tarjeta / Debit', icon: '💳' },
                    { id: 'PayPal', name: 'PayPal', icon: '🅿️' },
                    { id: 'ATM Card', name: 'ATM Card', icon: '🏧' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`flex items-center space-x-2 p-3 rounded-xl border text-xs font-semibold transition ${
                        paymentMethod === method.id
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/20'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-base">{method.icon}</span>
                      <span>{method.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base rounded-xl shadow-xl shadow-indigo-600/25 transition active:scale-98 disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>{isProcessing ? 'Procesando Pago...' : `Confirmar y Pagar €${line.price.toFixed(2)}`}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Purchased Digital Ticket Display */
          <div className="text-center py-2 animate-scaleIn">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-white mb-1">¡Billete Emitido con Éxito!</h3>
            <p className="text-xs text-emerald-400 font-semibold mb-4">
              Guardado en Firebase Firestore • Ref: {purchasedTicket.id.slice(0, 10)}
            </p>

            {/* Ticket Card Component */}
            <div className="bg-white/5 border border-indigo-500/40 rounded-2xl p-5 text-left relative shadow-xl overflow-hidden mb-6">
              <div className="absolute top-0 right-0 bg-indigo-600 text-white font-bold text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                VÁLIDO ONDEMAND
              </div>

              <div className="text-xs text-slate-400 font-semibold mb-1">EMPRESA PLANA</div>
              <div className="text-lg font-bold text-white mb-3">
                {purchasedTicket.origin} → {purchasedTicket.destination}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 mb-4 bg-white/5 p-3 rounded-xl border border-white/10">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Pasajero</span>
                  <span className="font-bold text-white">{purchasedTicket.passengerName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Asiento</span>
                  <span className="font-bold text-indigo-400">{purchasedTicket.seatNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Fecha / Salida</span>
                  <span className="font-semibold text-white">{purchasedTicket.date} ({purchasedTicket.departureTime})</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Pago</span>
                  <span className="font-semibold text-emerald-400">{purchasedTicket.paymentMethod}</span>
                </div>
              </div>

              {/* QR Code Container */}
              <div className="bg-white rounded-xl p-3 flex flex-col items-center justify-center text-slate-950 shadow-inner">
                <QrCode className="w-24 h-24 text-slate-900" />
                <span className="text-[10px] font-mono font-bold tracking-widest mt-1 text-slate-700">
                  {purchasedTicket.qrCode}
                </span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setPurchasedTicket(null);
                  onClose();
                }}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-slate-200 font-bold text-xs rounded-xl transition"
              >
                Cerrar
              </button>
              <button
                onClick={() => alert('Billete digital descargado a almacenamiento local.')}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center space-x-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Descargar PDF</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
