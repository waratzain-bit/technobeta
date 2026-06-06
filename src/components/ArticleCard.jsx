import React from 'react';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';

export default function ArticleCard({ post }) {
  // Dapatkan properti secara fleksibel baik dari key huruf besar maupun kecil (Sesuai output JSON Apps Script)
  const title = post.Judul || post.title || 'Untitled';
  const excerpt = post.Excerpt || post.summary || 'No description available.';
  const category = post.Kategori || post.category || 'General';
  const readTime = post.ReadTime || post.readTime || '3 mnt baca';

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
      <div>
        {/* Kategori Tag */}
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600 uppercase tracking-wide dark:bg-zinc-800 dark:text-zinc-400">
            {category}
          </span>
          <ArrowUpRight size={14} className="text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 dark:text-zinc-500" />
        </div>

        {/* Judul & Excerpt */}
        <h3 className="text-sm font-bold leading-snug tracking-tight text-slate-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-zinc-400 line-clamp-3">
          {excerpt}
        </p>
      </div>

      {/* Meta Keterangan Bawah */}
      <div className="mt-5 flex items-center space-x-4 border-t border-slate-100 pt-3 text-[11px] font-medium text-slate-400 dark:border-zinc-800 dark:text-zinc-500">
        <div className="flex items-center space-x-1">
          <Clock size={12} />
          <span>{readTime}</span>
        </div>
      </div>
    </div>
  );
}