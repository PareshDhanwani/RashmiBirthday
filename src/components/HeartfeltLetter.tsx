import React, { useState, useEffect } from 'react';
import { Mail, Heart, Edit3, Check, Sparkles, Feather } from 'lucide-react';
import { audioController } from '../utils/audioPlayer';
import { triggerHeartConfetti } from '../utils/confetti';

const DEFAULT_LETTER = `My Dearest Rashmi,

As you celebrate another glorious year of your life, I find myself pausing to marvel at all the quiet magic and warmth you have brought into mine.

You possess a rare, luminous grace—the kind that makes everyone feel heard, that brings warmth to chilly days, and turns any place into home simply because you are there. You are my calm in life's unpredictable storms, my greatest inspiration, and the dream I never knew I was allowed to have until you walked into my world.

I love the way your eyes light up when you speak of what you love. I love your infectious laughter that immediately erases every worry. Most of all, I love the tender, fierce, and generous heart you share with me every single day.

On this birthday, my promise to you is steadfast: to stand beside you through every mountain and valley, to champion every aspiration you hold in your soul, to celebrate your joys, and to love you more faithfully with every rising sun.

You are not only my fiancé; you are my best friend and my eternal home. Happy Birthday, my love. May this year shower you with all the peace, joy, and breathtaking wonder that you deserve.

Forever and unconditionally yours,
Paresh`;

const REASONS = [
  {
    title: 'Your Radiant Smile',
    desc: 'The effortless way your grin lights up any room and washes away every ounce of exhaustion.',
    icon: '✨',
  },
  {
    title: 'Your Boundless Compassion',
    desc: 'How deeply you care for family, friends, and every soul you encounter with genuine empathy.',
    icon: '🌸',
  },
  {
    title: 'Our Silent Understanding',
    desc: 'The secret glances across crowded rooms where a single look says everything.',
    icon: '💫',
  },
  {
    title: 'Your Fierce Ambition',
    desc: 'Watching you pursue your dreams with determination, brilliance, and gentle elegance.',
    icon: '👑',
  },
  {
    title: 'The Comfort of Your Touch',
    desc: 'How holding your hand instantly grounds me and makes the world feel safe and complete.',
    icon: '🤍',
  },
  {
    title: 'Our Promised Tomorrow',
    desc: 'The joy of knowing that all my tomorrows belong with you as we build our shared future.',
    icon: '💍',
  },
];

export const HeartfeltLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [letterContent, setLetterContent] = useState(DEFAULT_LETTER);
  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState(DEFAULT_LETTER);
  const [activeReason, setActiveReason] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('rashmi_birthday_letter');
    if (saved) {
      setLetterContent(saved);
      setTempContent(saved);
    }
  }, []);

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      audioController.playGiftUnwrap();
      triggerHeartConfetti();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSaveEdit = () => {
    setLetterContent(tempContent);
    localStorage.setItem('rashmi_birthday_letter', tempContent);
    setIsEditing(false);
    triggerHeartConfetti();
  };

  return (
    <section id="letter" className="relative py-20 overflow-hidden">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-gradient-to-tr from-[#9d4edd]/5 via-[#e0a96d]/10 to-transparent blur-3xl" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#e0a96d] font-medium mb-2">
            <Feather className="h-3.5 w-3.5" />
            <span>From Paresh With Love</span>
            <span aria-hidden="true">·</span>
            <span>A Heartfelt Letter</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#fcecd0]">
            Words Written For You
          </h2>
          <p className="mt-3 text-sm text-[#b8aeb7] max-w-lg mx-auto">
            Click the wax seal below to break the stamp and unfold an intimate message from the heart.
          </p>
        </div>

        {/* The Wax-Sealed Vintage Envelope Container */}
        <div className="relative mx-auto max-w-3xl">
          {!isOpen ? (
            /* Closed Wax Sealed Envelope Presentation */
            <div
              onClick={handleOpenEnvelope}
              className="cursor-pointer group relative rounded-2xl border border-[#e0a96d]/30 bg-gradient-to-br from-[#1d1622] via-[#241a2a] to-[#1a131f] p-8 sm:p-12 shadow-2xl transition-all duration-500 hover:border-[#e0a96d]/60 hover:scale-[1.01]"
            >
              {/* Envelope flap aesthetic lines */}
              <div className="absolute inset-x-8 top-0 h-28 border-b border-[#e0a96d]/20 bg-gradient-to-b from-[#281d2f]/60 to-transparent pointer-events-none" />

              <div className="flex flex-col items-center justify-center py-10 text-center">
                {/* Wax Seal Monogram Button */}
                <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#800f2f] via-[#a4133c] to-[#590d22] shadow-xl shadow-[#800f2f]/40 ring-4 ring-[#e0a96d]/30 group-hover:scale-110 transition-transform">
                  <div className="flex flex-col items-center">
                    <span className="font-serif text-lg font-bold tracking-widest text-[#fcecd0]">
                      R &amp; P
                    </span>
                    <Heart className="h-3 w-3 fill-[#fcecd0] text-[#fcecd0] -mt-0.5" />
                  </div>
                  {/* Subtle wax glow */}
                  <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="font-serif text-2xl font-medium tracking-wide text-[#fcecd0]">
                  To: Rashmi, My Future Wife
                </div>
                <div className="mt-1 text-xs text-[#e0a96d] tracking-widest uppercase">
                  Click to Break Wax Seal &amp; Unfold
                </div>
              </div>
            </div>
          ) : (
            /* Unfolded Parchment Letter Presentation */
            <div className="relative rounded-2xl border border-[#e0a96d]/40 bg-gradient-to-b from-[#1b1520] via-[#161019] to-[#1a1420] p-6 sm:p-10 shadow-2xl backdrop-blur-xl transition-all duration-700 animate-in fade-in zoom-in-95">
              {/* Top controls: Close & Edit */}
              <div className="flex items-center justify-between border-b border-[#e0a96d]/20 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-xs italic tracking-wider text-[#e0a96d]">
                    5th October 2026 · Confidential &amp; Forever
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#e0a96d]/30 bg-white/5 px-2.5 py-1 text-xs text-[#e0a96d] hover:bg-white/10 transition-colors"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    <span>{isEditing ? 'Cancel Edit' : 'Personalize Letter'}</span>
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-xs text-[#a3979f] hover:text-[#fcecd0] transition-colors"
                  >
                    Fold Back
                  </button>
                </div>
              </div>

              {/* Letter Prose Body */}
              {isEditing ? (
                <div className="space-y-4">
                  <textarea
                    rows={12}
                    value={tempContent}
                    onChange={(e) => setTempContent(e.target.value)}
                    className="w-full rounded-xl border border-[#e0a96d]/40 bg-[#120d15] p-4 font-serif text-base leading-relaxed text-[#fcecd0] focus:border-[#e0a96d] focus:outline-none"
                    placeholder="Write your custom heartfelt vows or memories here..."
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#e0a96d] px-4 py-2 text-xs font-semibold text-[#140f17] hover:bg-[#cf985d] transition-colors"
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>Save Personalized Letter</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {letterContent.split('\n\n').map((paragraph, index) => (
                    <p
                      key={index}
                      className="font-serif text-lg sm:text-xl font-normal leading-relaxed text-[#f4ebf2]/95 tracking-wide"
                    >
                      {paragraph}
                    </p>
                  ))}
                  <div className="pt-6 border-t border-[#e0a96d]/20 flex items-center justify-between">
                    <div className="font-script text-3xl sm:text-4xl text-[#e0a96d]">
                      Always &amp; Forever, Paresh
                    </div>
                    <button
                      onClick={triggerHeartConfetti}
                      className="flex items-center gap-1.5 text-xs text-[#f4b6c2] hover:text-white transition-colors"
                    >
                      <Heart className="h-4 w-4 fill-current text-[#f4b6c2]" />
                      <span>Send a Love Pulse</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* "Six Reasons Why You Hold My Heart" Interactive Grid */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#fcecd0]">
              Six Things I Adore About You
            </h3>
            <p className="text-xs text-[#a3979f] mt-1">
              Tap any card to unlock the memory behind it
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REASONS.map((reason, index) => {
              const isSelected = activeReason === index;
              return (
                <div
                  key={index}
                  onClick={() => {
                    setActiveReason(isSelected ? null : index);
                    triggerHeartConfetti();
                  }}
                  className={`cursor-pointer rounded-xl border p-5 transition-all duration-300 ${
                    isSelected
                      ? 'border-[#e0a96d] bg-[#221827] shadow-xl shadow-[#e0a96d]/10'
                      : 'border-[#e0a96d]/15 bg-[#16111a]/80 hover:border-[#e0a96d]/40 hover:bg-[#1d1522]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl" role="img" aria-label="symbol">
                      {reason.icon}
                    </span>
                    <span className="text-xs font-mono text-[#e0a96d]/70">
                      0{index + 1}
                    </span>
                  </div>
                  <h4 className="font-serif text-lg font-medium text-[#fcecd0]">
                    {reason.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#c4b8c0]">
                    {reason.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
