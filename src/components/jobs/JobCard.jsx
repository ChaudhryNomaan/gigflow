import React from 'react';
import { Heart, ThumbsDown, Star, Zap } from 'lucide-react';

const JobCard = ({ title, priceType, budget, level, description, tags, isNew }) => {
  return (
    <div className="group relative bg-white border border-slate-200 p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-indigo-200 first:rounded-t-2xl last:rounded-b-2xl border-t-0 first:border-t">
      
      {isNew && (
        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 rounded-l-full" />
      )}

      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[12px] font-medium text-slate-500">
            <span className="flex items-center gap-1"><Zap size={12} className="text-amber-500 fill-amber-500" /> Featured</span>
            <span>•</span>
            <span>Posted 12m ago</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug max-w-[90%]">
            {title}
          </h3>
        </div>
        <div className="flex gap-1">
          <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all">
            <Heart size={18} />
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-4 text-sm">
        <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-medium">{priceType}: {budget}</span>
        <span className="text-slate-400 font-light">—</span>
        <span className="text-slate-600 italic">{level}</span>
      </div>

      <p className="mt-4 text-[14px] text-slate-500 leading-relaxed line-clamp-2">
        {description}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="flex text-amber-400"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
          <span>Payment Verified</span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;