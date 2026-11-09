import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, ArrowRight, AlertCircle, Info } from 'lucide-react';

export const DemoAdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect directly to dashboard
    if (sessionStorage.getItem('demo_admin_auth') === 'true') {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      // Validates against strictly mandated demo passcode: 080807
      if (password === '080807') {
        sessionStorage.setItem('demo_admin_auth', 'true');
        navigate('/admin/dashboard');
      } else {
        setErrorMessage('Incorrect password.');
      }
      setIsLoading(false);
    }, 200);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4 text-slate-100 antialiased">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center mx-auto text-white shadow-xl shadow-sky-500/20">
          <Lock className="w-7 h-7" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          ADMIN LOGIN
        </h2>
        <p className="text-xs text-slate-400 max-w-xs mx-auto">
          Business Website & Menu Administration Panel
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-800 space-y-6">
          
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-xs text-red-400 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label 
                htmlFor="admin-password"
                className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20 transition cursor-pointer"
            >
              <span>{isLoading ? 'Verifying...' : 'Login'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Security Documentation Disclaimer */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
              <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block mb-0.5">Demo Mode Notice:</strong>
                This administration interface demonstrates client-side website customization. The demo authentication must be replaced with server-side authentication (e.g. JWT / OAuth) for production deployments.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
