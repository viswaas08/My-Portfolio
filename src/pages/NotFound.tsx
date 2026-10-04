import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, ArrowLeft } from 'lucide-react';
import { demosData } from '../data/demos';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-24 pb-16 px-4">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto text-3xl font-black">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            The page you're looking for doesn't exist or has moved. Explore our business demo websites below:
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {demosData.slice(0, 4).map((d) => (
            <Link
              key={d.id}
              to={d.route}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-sky-500 hover:text-white transition"
            >
              {d.businessName}
            </Link>
          ))}
        </div>

        <div className="pt-4 flex items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs sm:text-sm shadow-md transition"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/demos"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <Compass className="w-4 h-4" />
            <span>View All Demos</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
