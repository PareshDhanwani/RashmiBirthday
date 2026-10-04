import React, { useEffect, useState } from 'react';
import { FloatingPetalsCanvas } from './components/FloatingPetalsCanvas';
import { HeroSection } from './components/HeroSection';
import { HeartfeltLetter } from './components/HeartfeltLetter';
import { DigitalGiftBox } from './components/DigitalGiftBox';
import { Footer } from './components/Footer';
import { triggerBirthdaySurprise } from './utils/confetti';
import { audioController } from './utils/audioPlayer';
import { Volume2, VolumeX, Sparkles, ArrowUp } from 'lucide-react';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Subscribe to audio state
    const unsubscribe = audioController.subscribe((playing) => {
      setIsPlaying(playing);
    });

    // 1. Attempt immediate autoplay on mount
    audioController.unlockAndPlay().catch(() => {
      // Browser autoplay policy blocked until first user gesture
    });

    // 2. Global unlock on ANY user gesture (touch, scroll, click, mouse move, key press)
    const gestureEvents: (keyof WindowEventMap)[] = [
      'pointerdown',
      'touchstart',
      'click',
      'keydown',
      'scroll',
      'wheel',
      'pointermove',
    ];

    const handleFirstGesture = async () => {
      if (audioController.userExplicitlyPaused) return;
      if (!audioController.getIsPlaying()) {
        const ok = await audioController.unlockAndPlay();
        if (ok) {
          gestureEvents.forEach((evt) => {
            window.removeEventListener(evt, handleFirstGesture);
          });
        }
      }
    };

    gestureEvents.forEach((evt) => {
      window.addEventListener(evt, handleFirstGesture, { passive: true });
    });

    // Track scroll to show fixed scroll-to-top button
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Initial celebratory confetti after brief dwell
    const timer = setTimeout(() => {
      triggerBirthdaySurprise();
    }, 1200);

    return () => {
      unsubscribe();
      clearTimeout(timer);
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, handleFirstGesture);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleToggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioController.togglePlay();
  };

  const handleBannerPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioController.userExplicitlyPaused = false;
    audioController.unlockAndPlay();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="top" className="relative min-h-screen bg-[#0c0a0e] text-[#f7f2ed] selection:bg-[#e0a96d]/30 selection:text-[#fceddd]">
      {/* Background ambient floating rose petals & embers */}
      <FloatingPetalsCanvas />

      {/* Floating Audio Status Pill in Top Right */}
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={handleToggleAudio}
          className="flex items-center gap-2.5 rounded-full border border-[#e0a96d]/30 bg-[#16101a]/90 px-4 py-2 text-xs font-medium text-[#fcecd0] shadow-2xl backdrop-blur-md transition-all hover:border-[#e0a96d] hover:bg-[#201726]"
          title={isPlaying ? 'Pause Happy Birthday Tune' : 'Play Happy Birthday Tune'}
        >
          {isPlaying ? (
            <>
              <Volume2 className="h-4 w-4 text-[#e0a96d] animate-pulse" />
              <span className="hidden sm:inline">Playing: Happy Birthday Rashmi</span>
              <span className="sm:hidden">Playing</span>
              {/* Equalizer Waveform animation */}
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 bg-[#e0a96d] rounded-full animate-[pulseGlow_1s_infinite] h-2"></span>
                <span className="w-0.5 bg-[#e0a96d] rounded-full animate-[pulseGlow_1.4s_infinite] h-3"></span>
                <span className="w-0.5 bg-[#e0a96d] rounded-full animate-[pulseGlow_0.8s_infinite] h-1.5"></span>
              </div>
            </>
          ) : (
            <>
              <VolumeX className="h-4 w-4 text-[#a3979f]" />
              <span className="text-[#c4b8c0]">Play Birthday Song</span>
            </>
          )}
        </button>
      </div>

      {/* If audio is blocked by browser autoplay policy, show a prompt to unlock */}
      {!isPlaying && !audioController.userExplicitlyPaused && (
        <div
          onClick={handleBannerPlay}
          className="fixed bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 cursor-pointer rounded-full border border-[#e0a96d]/60 bg-gradient-to-r from-[#291730]/95 via-[#1a1120]/95 to-[#291730]/95 px-5 py-2.5 shadow-[0_0_30px_rgba(224,169,109,0.35)] backdrop-blur-md transition-all hover:scale-105 active:scale-95 hover:border-[#e0a96d]"
        >
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[#fcecd0]">
            <Volume2 className="h-4 w-4 text-[#e0a96d] animate-pulse" />
            <span>Tap anywhere to play Happy Birthday song 🎵</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="relative z-10 pt-4">
        {/* Hero Section with Personal Birthday Wish & Cake Ceremony */}
        <HeroSection />

        {/* Heartfelt Love Letter & Six Reasons */}
        <HeartfeltLetter />

        {/* Personalized Interactive Digital Gift Box (Forever Locket) */}
        <DigitalGiftBox />
      </main>

      {/* Footer */}
      <Footer />

      {/* Fixed Floating Bottom Action Cluster */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5">
        {/* Fixed Scroll-To-Top Button - Visible while scrolling down */}
        <button
          onClick={scrollToTop}
          title="Scroll to Top"
          aria-label="Scroll to top of page"
          className={`flex items-center gap-1.5 rounded-full border border-[#e0a96d]/30 bg-[#16101a]/95 px-3.5 py-2.5 text-xs font-medium text-[#fcecd0] shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 hover:border-[#e0a96d] hover:bg-[#231828] ${
            showScrollTop
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <ArrowUp className="h-4 w-4 text-[#e0a96d]" />
          <span className="hidden sm:inline">Top</span>
        </button>

        {/* Quick Floating Birthday Sparkle Button */}
        <button
          onClick={triggerBirthdaySurprise}
          title="Tap for Birthday Confetti"
          className="flex items-center gap-2 rounded-full border border-[#e0a96d]/40 bg-[#1e1524]/95 px-4 py-2.5 text-xs font-medium text-[#fcecd0] shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 hover:border-[#e0a96d]"
        >
          <Sparkles className="h-4 w-4 text-[#fbbf24] animate-pulse" />
          <span className="hidden sm:inline">Surprise Confetti</span>
        </button>
      </div>
    </div>
  );
}
