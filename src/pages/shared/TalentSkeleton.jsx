import React from 'react';

const TalentSkeleton = () => {
  return (
    <div className="bg-white border border-slate-100 rounded-[24px] p-6 relative overflow-hidden">
      {/* The Shimmer Overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-slate-50/60 to-transparent" />
      
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-2">
          <div className="h-2 w-10 bg-slate-100 rounded-full" /> 
          <div className="h-6 w-32 bg-slate-100 rounded-lg" /> 
        </div>
        <div className="w-2 h-2 rounded-full bg-slate-100" /> 
      </div>

      <div className="flex gap-2 mb-8">
        <div className="h-4 w-12 bg-slate-50 rounded" />
        <div className="h-4 w-16 bg-slate-50 rounded" />
      </div>

      <div className="flex items-end justify-between pt-4 border-t border-slate-50">
        <div className="space-y-2">
          <div className="h-2 w-8 bg-slate-50 rounded" />
          <div className="h-3 w-20 bg-slate-100 rounded" />
        </div>
        <div className="h-6 w-16 bg-slate-100 rounded-lg" />
      </div>
    </div>
  );
};

export default TalentSkeleton;