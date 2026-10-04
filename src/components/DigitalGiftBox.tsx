import React, { useState } from 'react';
import { Gift, Sparkles, Heart, Lock, Unlock } from 'lucide-react';
import { audioController } from '../utils/audioPlayer';
import { triggerBirthdaySurprise, triggerHeartConfetti, triggerSparkleBurst } from '../utils/confetti';

export const DigitalGiftBox: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isLocketOpen, setIsLocketOpen] = useState(false);

  const handleOpenBox = () => {
    if (!isOpened) {
      audioController.playGiftUnwrap();
      triggerBirthdaySurprise();
      setIsOpened(true);
    }
  };

  const handleToggleLocket = () => {
    setIsLocketOpen(!isLocketOpen);
    audioController.playGiftUnwrap();
    if (!isLocketOpen) {
      triggerHeartConfetti();
    } else {
      triggerSparkleBurst();
    }
  };

  return (
    <section id="giftbox" className="relative py-20 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[500px] w-[700px] rounded-full bg-gradient-to-tl from-[#e0a96d]/15 via-[#f4b6c2]/10 to-transparent blur-3xl" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#e0a96d] font-medium mb-2">
            <Gift className="h-3.5 w-3.5" />
            <span>A Special Birthday Surprise</span>
            <span aria-hidden="true">·</span>
            <span>Personalized Keepsake</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#fcecd0]">
            The Birthday Gift Box
          </h2>
          <p className="mt-3 text-sm text-[#b8aeb7] max-w-md mx-auto">
            A token of my eternal devotion, wrapped with love and sealed exclusively for Rashmi.
          </p>
        </div>

        {/* The Closed Box State */}
        {!isOpened ? (
          <div className="mx-auto max-w-md text-center">
            <div
              onClick={handleOpenBox}
              className="group cursor-pointer relative mx-auto flex flex-col items-center justify-center rounded-3xl border border-[#e0a96d]/30 bg-gradient-to-b from-[#241a29] to-[#16111a] p-10 shadow-2xl transition-all duration-500 hover:border-[#e0a96d]/70 hover:scale-[1.02]"
            >
              {/* Outer Golden Aura */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#e0a96d]/20 via-[#f4b6c2]/30 to-[#e0a96d]/20 blur-xl group-hover:opacity-100 transition-opacity" />

              {/* The 3D Illustrated Gift Box Representation */}
              <div className="relative mb-6 flex h-36 w-36 items-center justify-center">
                {/* Box Base */}
                <div className="relative h-28 w-28 rounded-2xl bg-gradient-to-br from-[#800f2f] via-[#a4133c] to-[#590d22] border border-[#e0a96d]/50 shadow-2xl flex items-center justify-center">
                  {/* Golden Cross Ribbon */}
                  <div className="absolute inset-x-0 h-6 bg-gradient-to-r from-[#e0a96d] via-[#fcecd0] to-[#e0a96d] shadow-sm" />
                  <div className="absolute inset-y-0 w-6 bg-gradient-to-b from-[#e0a96d] via-[#fcecd0] to-[#e0a96d] shadow-sm" />

                  {/* Ribbon Bow */}
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#fbbf24] to-[#d97706] shadow-lg ring-2 ring-[#fcecd0] group-hover:scale-110 transition-transform">
                    <Sparkles className="h-6 w-6 text-[#1a0f1d]" />
                  </div>
                </div>
              </div>

              <h3 className="font-serif text-2xl font-medium text-[#fcecd0] group-hover:text-[#e0a96d] transition-colors">
                Tap To Untie Ribbon &amp; Open
              </h3>
              <p className="mt-2 text-xs text-[#c4b8c0] max-w-xs">
                Prepared with all my love for the most incredible fiancé in the world.
              </p>
            </div>
          </div>
        ) : (
          /* The Opened Gift Showcase Container - Exclusively The Forever Locket */
          <div className="relative rounded-3xl border border-[#e0a96d]/40 bg-gradient-to-b from-[#1b1422]/95 via-[#16101a]/95 to-[#1c1323]/95 p-8 sm:p-12 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-500 text-center">
            {/* Soft top header */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="h-4 w-4 text-[#e0a96d]" />
              <span className="font-serif text-xl sm:text-2xl font-medium text-[#fcecd0]">
                The Forever Locket
              </span>
              <Sparkles className="h-4 w-4 text-[#e0a96d]" />
            </div>

            <p className="text-xs uppercase tracking-widest text-[#e0a96d]/90 font-medium mb-8">
              {isLocketOpen ? 'Keepsake Unlocked · Click to close' : 'Click the locket to reveal the vow inside'}
            </p>

            {/* Centered Golden Locket */}
            <div className="flex justify-center mb-8">
              <div
                onClick={handleToggleLocket}
                className="group cursor-pointer relative flex h-56 w-56 sm:h-64 sm:w-64 items-center justify-center rounded-full bg-gradient-to-br from-[#ffe082] via-[#e0a96d] to-[#b3773b] p-3 shadow-2xl ring-4 ring-[#fcecd0]/30 transition-transform duration-500 hover:scale-105"
              >
                {/* Locket Inside Chamber */}
                <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#24172a] via-[#1a1120] to-[#25182c] p-6 border-2 border-[#e0a96d]/50 shadow-inner relative overflow-hidden">
                  {!isLocketOpen ? (
                    <div className="space-y-2 text-center">
                      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#e0a96d]/15 text-[#e0a96d] mb-1 group-hover:scale-110 transition-transform">
                        <Lock className="h-5 w-5" />
                      </div>
                      <div className="font-serif text-3xl font-bold tracking-widest text-[#fcecd0]">
                        R &amp; P
                      </div>
                      <div className="text-[11px] text-[#e0a96d] uppercase tracking-widest font-mono">
                        Locked With Love
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 text-center animate-in zoom-in-75 duration-300">
                      <div className="flex items-center justify-center gap-1 text-[#f4b6c2]">
                        <Unlock className="h-4 w-4" />
                        <Heart className="h-4 w-4 fill-current text-[#f4b6c2]" />
                      </div>
                      <p className="font-serif text-sm sm:text-base italic text-[#fcecd0] leading-snug px-1">
                        &ldquo;You hold my heart across every lifetime. My promise is to never let you go.&rdquo;
                      </p>
                      <div className="font-script text-2xl text-[#e0a96d] pt-1">
                        Forever, Paresh
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Keepsake Description & Loving Action */}
            <div className="max-w-md mx-auto space-y-4">
              <p className="text-xs sm:text-sm text-[#c4b8c0] leading-relaxed">
                Just as this golden locket holds our initials, my heart holds every dream, laugh, and tomorrow we are destined to share together.
              </p>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={triggerHeartConfetti}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#d48b50] via-[#e0a96d] to-[#d48b50] px-5 py-2.5 text-xs font-semibold text-[#140f17] shadow-lg shadow-[#e0a96d]/20 hover:scale-105 active:scale-95 transition-all"
                >
                  <Heart className="h-4 w-4 fill-[#140f17]" />
                  <span>Send Love Pulse 💕</span>
                </button>

                <button
                  onClick={triggerBirthdaySurprise}
                  className="rounded-xl border border-[#e0a96d]/40 bg-[#1e1524] px-4 py-2.5 text-xs font-medium text-[#fcecd0] hover:bg-[#2c1f33] transition-colors"
                >
                  Confetti Shower 🎉
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
