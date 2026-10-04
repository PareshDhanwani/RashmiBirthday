import confetti from 'canvas-confetti';
import { audioController } from './audioPlayer';

export const triggerBirthdaySurprise = () => {
  audioController.playConfettiChime();

  // Grand center burst
  confetti({
    particleCount: 80,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#e0a96d', '#f4b6c2', '#ffcad4', '#d88398', '#ffd700', '#ffffff'],
    disableForReducedMotion: true,
  });

  // Left cannon
  window.setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#ffd700', '#e0a96d', '#f3a683', '#f8a5c2'],
    });
  }, 180);

  // Right cannon
  window.setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#e0a96d', '#f4b6c2', '#ffffff', '#e84118'],
    });
  }, 350);

  // Gentle star shower
  window.setTimeout(() => {
    confetti({
      particleCount: 40,
      spread: 120,
      origin: { y: 0.3 },
      shapes: ['star', 'circle'],
      colors: ['#fcecd0', '#ffdf9e', '#e0a96d'],
    });
  }, 500);
};

export const triggerHeartConfetti = () => {
  audioController.playConfettiChime();

  const scalar = 2;
  const heart = confetti.shapeFromPath({
    path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  });

  confetti({
    shapes: [heart],
    scalar,
    particleCount: 40,
    spread: 80,
    origin: { y: 0.5 },
    colors: ['#e84118', '#f4b6c2', '#ff5252', '#d88398'],
  });
};

export const triggerSparkleBurst = (xRatio: number = 0.5, yRatio: number = 0.5) => {
  confetti({
    particleCount: 35,
    spread: 60,
    origin: { x: xRatio, y: yRatio },
    colors: ['#e0a96d', '#fcecd0', '#ffdf9e', '#ffffff'],
    ticks: 120,
    gravity: 0.8,
    scalar: 0.9,
  });
};
