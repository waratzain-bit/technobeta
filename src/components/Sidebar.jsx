import React from 'react';
import { Layers, Cpu, Code, Globe2 } from 'lucide-react';

const CATEGORIES = [
  { id: 'Semua', label: 'Semua Koleksi', icon: Layers },
  { id: 'Web App', label: 'Web Application', icon: Globe2 },
  { id: 'Apps Script', label: 'Apps Script', icon: Cpu },
  { id: 'React', label: 'React UI', icon: Code },
];

export default function Sidebar({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 transition-colors duration-300 shadow-xs">
      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 px-3 mb-2">
        Filter Kategori
      </span>
      <nav className="space-y-1">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-slate-100 text-slate-900 dark:bg-zinc-800 dark:text-white'
                  : 'text-slate-600 hover:bg-slate-50 dark:text-zinc-400 dark:hover:bg-zinc-800/40'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-indigo-600 dark:text-emerald-400' : ''} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}