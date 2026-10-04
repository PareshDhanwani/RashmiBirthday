/**
 * Web Audio API synthesizer for romantic ambient background music and celebration SFX.
 * Zero external audio file dependency ensures 100% reliability, instant start, and no CORS issues.
 */

type SoundTrackId = 'birthday' | 'twilight' | 'starlight';

export interface SoundTrack {
  id: SoundTrackId;
  title: string;
  mood: string;
}

export const SOUNDTRACKS: SoundTrack[] = [
  { id: 'birthday', title: 'Happy Birthday Rashmi', mood: 'Celebratory Piano & Warm Chimes' },
  { id: 'twilight', title: 'Twilight Serenade', mood: 'Gentle Piano & Soft Strings' },
  { id: 'starlight', title: 'Starlight Reverie', mood: 'Romantic Music Box' },
];

class AudioController {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTrack: SoundTrackId = 'birthday';
  private timerId: number | null = null;
  private volume: number = 0.65;
  private masterGain: GainNode | null = null;
  private subscribers: Set<(playing: boolean) => void> = new Set();
  private customAudio: HTMLAudioElement | null = null;
  private customAudioSrc: string | null = null;
  private activeOscillators: OscillatorNode[] = [];
  public userExplicitlyPaused: boolean = false;

  public initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (!this.masterGain && this.ctx) {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public subscribe(cb: (playing: boolean) => void) {
    this.subscribers.add(cb);
    cb(this.isPlaying);
    return () => {
      this.subscribers.delete(cb);
    };
  }

  private notify() {
    this.subscribers.forEach((cb) => cb(this.isPlaying));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getContextState(): AudioContextState | 'uninitialized' {
    return this.ctx ? this.ctx.state : 'uninitialized';
  }

  public getCurrentTrack(): SoundTrackId {
    return this.currentTrack;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx && this.isPlaying) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public setTrack(trackId: SoundTrackId) {
    this.currentTrack = trackId;
    if (this.isPlaying) {
      this.stop();
      this.play();
    }
  }

  public async togglePlay(): Promise<boolean> {
    if (this.isPlaying) {
      this.stop(true);
      return false;
    } else {
      this.userExplicitlyPaused = false;
      return await this.unlockAndPlay();
    }
  }

  public async unlockAndPlay(): Promise<boolean> {
    if (this.userExplicitlyPaused) return false;
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch {
        return false;
      }
    }
    return await this.play();
  }

  public async play(): Promise<boolean> {
    this.initContext();
    if (!this.ctx || !this.masterGain) return false;

    if (this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch {
        // Autoplay policy prevented resume
      }
    }

    if (this.customAudio && this.customAudioSrc) {
      try {
        await this.customAudio.play();
        this.isPlaying = true;
        this.notify();
        return true;
      } catch {
        // Fallback to synth
      }
    }

    if (this.ctx.state === 'running') {
      // Restore volume
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      this.isPlaying = true;
      this.notify();

      // Clear any previous loop
      if (this.timerId !== null) {
        window.clearInterval(this.timerId);
        this.timerId = null;
      }

      this.startSynthesizedMusic();
      return true;
    } else {
      // Browser autoplay policy prevented starting sound until first gesture
      this.isPlaying = false;
      this.notify();
      return false;
    }
  }

  public stop(userAction: boolean = false): void {
    if (userAction) {
      this.userExplicitlyPaused = true;
    }
    this.isPlaying = false;

    // Immediately stop & disconnect all currently scheduled/running oscillators
    this.activeOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Already stopped
      }
    });
    this.activeOscillators = [];

    // Mute master gain instantly with 0ms latency
    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      } catch {
        // Handled
      }
    }

    // Suspend audio context to halt all hardware sound processing
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend().catch(() => {});
    }

    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }

    if (this.customAudio) {
      this.customAudio.pause();
    }

    this.notify();
  }

  // Load user custom audio track
  public setCustomAudio(url: string) {
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.customAudioSrc = url;
    this.customAudio = new Audio(url);
    this.customAudio.loop = true;
    this.customAudio.volume = this.volume;
    if (this.isPlaying) {
      this.stop();
      this.play();
    }
  }

  private startSynthesizedMusic() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    if (this.currentTrack === 'birthday') {
      this.startBirthdayTune();
      return;
    }

    // Chord progressions for romantic ambient melodies
    const twilightProgression = [
      [146.83, 220.00, 277.18, 369.99, 440.00], // Dmaj9 (D3, A3, C#4, F#4, A4)
      [185.00, 220.00, 277.18, 329.63, 440.00], // F#m7 (F#3, A3, C#4, E4, A4)
      [196.00, 246.94, 293.66, 369.99, 493.88], // Gmaj7 (G3, B3, D4, F#4, B4)
      [220.00, 277.18, 329.63, 392.00, 554.37], // A7sus4/A9 (A3, C#4, E4, G4, C#5)
    ];

    const starlightProgression = [
      [261.63, 329.63, 392.00, 523.25, 659.25], // Cmaj7/9
      [220.00, 261.63, 329.63, 440.00, 523.25], // Am7
      [174.61, 220.00, 261.63, 349.23, 440.00], // Fmaj7
      [196.00, 246.94, 293.66, 392.00, 493.88], // Gsus4/G
    ];

    const progression = this.currentTrack === 'starlight' ? starlightProgression : twilightProgression;

    let step = 0;
    const playNextBar = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const chord = progression[step % progression.length];
      step++;

      const now = this.ctx.currentTime;

      // Play soft warm pad
      this.playPadChord(chord, now, 3.2);

      // Play gentle arpeggiated piano notes across the bar
      chord.forEach((freq, idx) => {
        const noteDelay = idx * 0.45 + (Math.random() * 0.08);
        this.playPianoNote(freq, now + noteDelay, 1.8);
        if (idx === 2 || idx === 4) {
          this.playPianoNote(freq * 1.5, now + noteDelay + 0.22, 1.2, 0.4);
        }
      });
    };

    playNextBar();
    this.timerId = window.setInterval(playNextBar, 2800);
  }

  private startBirthdayTune() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const beat = 0.52; // seconds per beat

    const melody: { f: number; d: number }[] = [
      // Line 1: Happy Birthday to You
      { f: 392.00, d: 0.75 },
      { f: 392.00, d: 0.25 },
      { f: 440.00, d: 1.0 },
      { f: 392.00, d: 1.0 },
      { f: 523.25, d: 1.0 },
      { f: 493.88, d: 2.0 },

      // Line 2: Happy Birthday to You
      { f: 392.00, d: 0.75 },
      { f: 392.00, d: 0.25 },
      { f: 440.00, d: 1.0 },
      { f: 392.00, d: 1.0 },
      { f: 587.33, d: 1.0 },
      { f: 523.25, d: 2.0 },

      // Line 3: Happy Birthday dear Rashmi
      { f: 392.00, d: 0.75 },
      { f: 392.00, d: 0.25 },
      { f: 783.99, d: 1.0 },
      { f: 659.25, d: 1.0 },
      { f: 523.25, d: 1.0 },
      { f: 493.88, d: 1.0 },
      { f: 440.00, d: 2.0 },

      // Line 4: Happy Birthday to You
      { f: 698.46, d: 0.75 },
      { f: 698.46, d: 0.25 },
      { f: 659.25, d: 1.0 },
      { f: 523.25, d: 1.0 },
      { f: 587.33, d: 1.0 },
      { f: 523.25, d: 2.6 },
    ];

    const chords: { timeOffset: number; chord: number[] }[] = [
      { timeOffset: 0, chord: [261.63, 329.63, 392.00] }, // C
      { timeOffset: 3 * beat, chord: [196.00, 246.94, 293.66, 349.23] }, // G7
      { timeOffset: 6 * beat, chord: [196.00, 246.94, 293.66] }, // G
      { timeOffset: 9 * beat, chord: [261.63, 329.63, 392.00] }, // C
      { timeOffset: 12 * beat, chord: [261.63, 329.63, 392.00] }, // C
      { timeOffset: 15 * beat, chord: [174.61, 220.00, 261.63, 349.23] }, // F
      { timeOffset: 18 * beat, chord: [261.63, 329.63, 392.00] }, // C
      { timeOffset: 21 * beat, chord: [196.00, 246.94, 293.66, 349.23] }, // G7
      { timeOffset: 23 * beat, chord: [261.63, 329.63, 392.00, 523.25] }, // C
    ];

    const totalSongDuration = (25.5 * beat + 1.2) * 1000;

    const playTuneCycle = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;

      // Play chords
      chords.forEach((c) => {
        this.playPadChord(c.chord, now + c.timeOffset, 2.5);
      });

      // Play melody
      let currentOffset = 0;
      melody.forEach((note) => {
        const noteDuration = note.d * beat;
        this.playPianoNote(note.f, now + currentOffset, noteDuration * 0.9, 1.25);
        if (note.f >= 523) {
          this.playPianoNote(note.f * 2, now + currentOffset + 0.02, noteDuration * 0.5, 0.25);
        }
        currentOffset += noteDuration;
      });
    };

    playTuneCycle();
    this.timerId = window.setInterval(playTuneCycle, totalSongDuration);
  }

  private playPianoNote(freq: number, time: number, duration: number, gainMult: number = 1.0) {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    noteGain.gain.setValueAtTime(0.0001, time);
    noteGain.gain.linearRampToValueAtTime(0.18 * gainMult, time + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.06 * gainMult, time + 0.4);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(noteGain);
    noteGain.connect(this.masterGain);

    this.activeOscillators.push(osc);
    osc.onended = () => {
      const idx = this.activeOscillators.indexOf(osc);
      if (idx !== -1) {
        this.activeOscillators.splice(idx, 1);
      }
    };

    osc.start(time);
    osc.stop(time + duration);
  }

  private playPadChord(frequencies: number[], time: number, duration: number) {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    frequencies.slice(0, 3).forEach((freq) => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * 0.5, time);

      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(0.05, time + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      this.activeOscillators.push(osc);
      osc.onended = () => {
        const idx = this.activeOscillators.indexOf(osc);
        if (idx !== -1) {
          this.activeOscillators.splice(idx, 1);
        }
      };

      osc.start(time);
      osc.stop(time + duration);
    });
  }

  // Celebratory sound effects
  public playConfettiChime() {
    this.initContext();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    const sfxGain = this.ctx.createGain();
    sfxGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    sfxGain.connect(this.ctx.destination);

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    const now = this.ctx.currentTime;

    notes.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.06);

      gain.gain.setValueAtTime(0.001, now + i * 0.06);
      gain.gain.linearRampToValueAtTime(0.2, now + i * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.8);

      osc.connect(gain);
      gain.connect(sfxGain);

      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.8);
    });
  }

  public playCandleBlow() {
    this.initContext();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.6;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.5);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 0.6);
  }

  public playGiftUnwrap() {
    this.initContext();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    const arpeggio = [440, 554.37, 659.25, 880, 1108.73];
    const now = this.ctx.currentTime;
    const sfxGain = this.ctx.createGain();
    sfxGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    sfxGain.connect(this.ctx.destination);

    arpeggio.forEach((f, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + idx * 0.07);

      gain.gain.setValueAtTime(0.001, now + idx * 0.07);
      gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.07 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.9);

      osc.connect(gain);
      gain.connect(sfxGain);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.9);
    });
  }
}

export const audioController = new AudioController();
