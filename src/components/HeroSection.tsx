import React, { useState } from 'react';
import { Heart, Sparkles, Flame, RotateCcw } from 'lucide-react';
import { triggerBirthdaySurprise } from '../utils/confetti';
import { audioController } from '../utils/audioPlayer';

export const HeroSection: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishRevealed, setWishRevealed] = useState(false);

  const handleBlowCandles = () => {
    if (!candlesLit) return;
    audioController.playCandleBlow();
    setCandlesLit(false);

    window.setTimeout(() => {
      setWishRevealed(true);
      triggerBirthdaySurprise();
    }, 450);
  };

  const handleRelight = () => {
    setCandlesLit(true);
    setWishRevealed(false);
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Decorative ambient radial glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[550px] w-[850px] rounded-full bg-gradient-to-b from-[#e0a96d]/15 via-[#d88398]/10 to-transparent blur-3xl" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtitle & Kicker */}
        <div className="inline-flex items-center justify-center gap-2 text-xs tracking-widest uppercase text-[#e0a96d]/90 font-medium mb-3">
          <span>To My Beloved Fiance</span>
          <span aria-hidden="true">·</span>
          <span>5th October 2026 Celebration</span>
          <span aria-hidden="true">·</span>
          <Heart className="h-3 w-3 fill-[#e0a96d] text-[#e0a96d]" />
        </div>

        {/* Grand Headline */}
        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal leading-[1.06] tracking-tight text-[#fcecd0] mb-6">
          Happy Birthday, <br />
          <span className="italic text-rose-gold font-serif">Dearest Rashmi</span>
        </h1>

        {/* Heartfelt Dedication */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-[#dfd4cc] font-light mb-10">
          You walked into my life and turned every ordinary second into poetry.
          Today is a celebration of the warmth of your laughter, the kindness of your heart,
          and the beautiful life we are building hand in hand.
        </p>

        {/* Interactive Birthday Cake & Wish Ceremony Container */}
        <div className="mx-auto max-w-2xl rounded-3xl border border-[#e0a96d]/30 bg-gradient-to-br from-[#1d1522]/95 via-[#18111c]/95 to-[#150f19]/95 p-6 sm:p-9 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-[#fbbf24]" />
              <span className="text-xs uppercase tracking-wider font-semibold text-[#fcecd0]">
                The Birthday Wish Ceremony
              </span>
            </div>
            <span className="text-xs text-[#e0a96d]">
              {candlesLit ? 'Candles are glowing ✨' : 'Wish made & blessed 💖'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
            {/* Visual Birthday Cake with interactive flames */}
            <div className="relative flex flex-col items-center shrink-0">
              {/* Candle Flames */}
              <div className="flex items-center gap-5 mb-1">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex flex-col items-center">
                    {candlesLit ? (
                      <div className="relative h-7 w-3.5 animate-flame">
                        {/* Inner hot core */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#f59e0b] via-[#fbbf24] to-[#fef08a]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-1.5 rounded-full bg-white blur-[0.5px]" />
                      </div>
                    ) : (
                      <div className="h-7 w-3.5 flex items-start justify-center">
                        <span className="text-xs text-[#9ca3af] opacity-60 animate-ping">☁</span>
                      </div>
                    )}
                    {/* Candle Stick */}
                    <div className="h-8 w-2.5 rounded-t-sm bg-gradient-to-b from-[#e0a96d] to-[#b3773b] border-x border-[#fcecd0]/30" />
                  </div>
                ))}
              </div>

              {/* Cake Tiers */}
              <div className="w-36 h-7 rounded-t-xl bg-gradient-to-r from-[#3d273a] via-[#52334f] to-[#3d273a] border-t border-[#f4b6c2]/40 relative overflow-hidden flex items-center justify-around px-3 text-[10px] text-[#f4b6c2]">
                <div className="absolute inset-x-0 top-0 h-1 bg-[#f4b6c2]/30" />
                ✦ ✦ ✦ ✦ ✦
              </div>
              <div className="w-48 h-9 rounded-b-xl bg-gradient-to-r from-[#291729] via-[#3a1f39] to-[#291729] border border-[#e0a96d]/30 relative flex items-center justify-center shadow-lg">
                <span className="font-serif text-sm italic tracking-widest text-[#fcecd0]">
                  Rashmi
                </span>
              </div>
              {/* Golden Plate */}
              <div className="w-56 h-2 rounded-full bg-gradient-to-r from-transparent via-[#e0a96d]/50 to-transparent mt-1" />
            </div>

            {/* Wish Actions & Message */}
            <div className="space-y-4 text-center sm:text-left flex-1">
              {candlesLit ? (
                <div>
                  <h2 className="font-serif text-2xl font-medium text-[#fcecd0]">
                    Make Your Birthday Wish
                  </h2>
                  <p className="text-xs text-[#c4b8c0] mt-1.5 mb-4 leading-relaxed">
                    Close your eyes, think of your sweetest dream, and blow out the candles.
                  </p>
                  <button
                    onClick={handleBlowCandles}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#fbbf24] via-[#e0a96d] to-[#d97706] px-6 py-3 text-xs font-semibold tracking-wide text-[#140f17] shadow-xl shadow-[#fbbf24]/20 transition-all hover:scale-105 active:scale-95"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Blow Out The Candles</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 text-xs text-[#fbbf24] font-medium">
                    <Sparkles className="h-4 w-4" />
                    <span>Wish blessed &amp; sent to the stars!</span>
                  </div>
                  <p className="font-serif text-lg italic text-[#fcecd0] leading-snug">
                    &ldquo;May every silent hope you hold dear bloom into joy, health, and endless love this year. I love you, Rashmi.&rdquo;
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                    <button
                      onClick={triggerBirthdaySurprise}
                      className="rounded-lg bg-gradient-to-r from-[#e0a96d] to-[#d48b50] px-4 py-2 text-xs font-semibold text-[#140f17] shadow-md hover:scale-105 transition-transform"
                    >
                      More Confetti 🎉
                    </button>
                    <button
                      onClick={handleRelight}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-[#c4b8c0] hover:text-[#fcecd0] hover:border-white/20 transition-colors"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Relight Candles</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
