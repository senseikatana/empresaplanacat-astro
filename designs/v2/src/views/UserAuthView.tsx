import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bus, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ViewMode } from '../types';

interface UserAuthViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const UserAuthView: React.FC<UserAuthViewProps> = ({ onNavigate }) => {
  const { loginWithEmail, signUpWithEmail, loginWithGoogle, user, logout } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setMessage('');
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password, name);
        setMessage('¡Cuenta creada correctamente con Firebase!');
      } else {
        await loginWithEmail(email, password);
        setMessage('¡Sesión iniciada correctamente!');
      }
      setTimeout(() => {
        onNavigate('home');
      }, 1000);
    } catch (err: any) {
      setMessage('Error de autenticación: ' + (err.message || 'Comprueba tus datos'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="p-4 sm:p-6 max-w-md mx-auto space-y-5 text-slate-100"
    >
      {/* Title Header */}
      <div className="text-center space-y-2 pt-2">
        <div className="inline-flex items-center space-x-2 text-blue-400 font-bold text-lg">
          <Bus className="w-6 h-6 text-blue-400" />
          <span>Empresa Plana</span>
        </div>
        <h2 className="font-extrabold text-xl text-white tracking-tight">User Login & Registration</h2>
      </div>

      {/* Main Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
        {/* Social Buttons Stack */}
        <div className="space-y-2.5">
          {/* Google */}
          <button
            onClick={() => loginWithGoogle()}
            className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-2xl font-bold text-sm text-slate-200 flex items-center justify-center space-x-2 transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google</span>
          </button>

          {/* Apple */}
          <button
            onClick={() => loginWithGoogle()}
            className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-2xl font-bold text-sm text-slate-200 flex items-center justify-center space-x-2 transition"
          >
            <span className="text-base font-bold"></span>
            <span>Apple</span>
          </button>

          {/* GitHub */}
          <button
            onClick={() => loginWithGoogle()}
            className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-2xl font-bold text-sm text-slate-200 flex items-center justify-center space-x-2 transition"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </button>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-3 pt-2">
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="Nombre Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {message && (
            <p className="text-xs text-emerald-400 font-semibold text-center">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition shadow-md shadow-blue-600/20"
          >
            {loading ? 'Procesando...' : isSignUp ? 'Crear Cuenta' : 'Login'}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition"
            >
              {isSignUp ? '¿Ya tienes cuenta? Iniciar Sesión' : 'Sign Up (Crear nueva cuenta)'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
