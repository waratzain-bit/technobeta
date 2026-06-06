import React from 'react';
import { Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* Sisi Kiri: Hak Cipta */}
          <div className="text-xs font-medium text-slate-500 dark:text-zinc-400 text-center md:text-left">
            © {new Date().getFullYear()} AdminRhimas Engine. Built for speed and flexibility.
          </div>

          {/* Sisi Kanan: Newsletter Minimalis */}
          <div className="flex flex-col sm:flex-row items-center gap-2 justify-center md:justify-end">
            <input
              type="email"
              placeholder="Berlangganan pembaruan skrip..."
              className="w-full sm:w-64 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium outline-none transition-all focus:border-indigo-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:focus:border-emerald-400"
            />
            <button className="flex items-center justify-center space-x-1 w-full sm:w-auto rounded-xl bg-slate-900 px-4 py-1.5 text-xs font-bold text-white transition-all hover:bg-slate-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200">
              <Send size={12} />
              <span>Join</span>
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}