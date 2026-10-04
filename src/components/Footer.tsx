import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-[#e0a96d]/15 bg-[#09070c] py-12 text-[#a3979f]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          {/* Brand & Dedication */}
          <div className="space-y-1">
            <div className="font-serif text-xl tracking-wide text-[#fcecd0]">
              Rashmi &amp; Paresh
            </div>
            <p className="text-xs text-[#8a7f87]">
              Crafted with all my heart to celebrate your birthday and our eternal journey.
            </p>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-2 text-xs text-[#8a7f87]">
            <span>Always &amp; Forever</span>
            <Heart className="h-3 w-3 fill-[#e0a96d] text-[#e0a96d]" />
            <span>5th October 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
