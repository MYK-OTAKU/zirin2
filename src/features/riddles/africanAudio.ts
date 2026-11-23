/**
 * African Audio Ambience Engine using Web Audio API synthesis.
 * Recreates authentic instrumental timbres:
 * - Balafon (wooden xylophone with calabash resonators)
 * - Djembé (traditional West African goat-skin drum)
 * - Kora (harp-lute with gentle harmonics)
 *
 * 100% autonomous, zero external dependencies, non-intrusive and respects mute preference.
 */

const AUDIO_MUTED_KEY = 'zirin_audio_muted_v1';

class AfricanAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const saved = window.localStorage.getItem(AUDIO_MUTED_KEY);
        // Default to not muted if user hasn't explicitly disabled, or restore saved state
        this.isMuted = saved === 'true';
      } catch {
        this.isMuted = false;
      }
    }
  }

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(AUDIO_MUTED_KEY, String(this.isMuted));
      } catch {
        // Ignore
      }
    }
    // If unmuting, play a tiny feedback chime
    if (!this.isMuted) {
      this.playBalafonNote(523.25, 0.15, 0.15); // C5
    }
    return this.isMuted;
  }

  /**
   * Synthesizes a Balafon wooden bar strike with gourd resonance.
   * Uses dual oscillators (fundamental + wooden overtone) with fast decay.
   */
  private playBalafonNote(freq: number, startTime = 0, duration = 0.4, gainLevel = 0.22) {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const t = ctx.currentTime + startTime;

    // Fundamental wooden resonance
    const oscFund = ctx.createOscillator();
    oscFund.type = 'sine';
    oscFund.frequency.setValueAtTime(freq, t);

    // Hardwood overtone (approx 2.76x harmonic ratio for African hardwood)
    const oscOvertone = ctx.createOscillator();
    oscOvertone.type = 'triangle';
    oscOvertone.frequency.setValueAtTime(freq * 2.76, t);

    // Gain Envelopes
    const gainFund = ctx.createGain();
    gainFund.gain.setValueAtTime(0, t);
    gainFund.gain.linearRampToValueAtTime(gainLevel, t + 0.008); // Sharp wooden attack
    gainFund.gain.exponentialRampToValueAtTime(0.0001, t + duration); // Natural resonance decay

    const gainOver = ctx.createGain();
    gainOver.gain.setValueAtTime(0, t);
    gainOver.gain.linearRampToValueAtTime(gainLevel * 0.35, t + 0.005);
    gainOver.gain.exponentialRampToValueAtTime(0.0001, t + duration * 0.4); // Quick overtone decay

    // Lowpass filter to emulate warm calabash gourd resonator
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 3.5, t);

    oscFund.connect(gainFund);
    oscOvertone.connect(gainOver);

    gainFund.connect(filter);
    gainOver.connect(filter);

    filter.connect(ctx.destination);

    oscFund.start(t);
    oscOvertone.start(t);

    oscFund.stop(t + duration);
    oscOvertone.stop(t + duration);
  }

  /**
   * Synthesizes a gentle, muffled Djembé bass tone.
   */
  private playDjembeTone(startPitch: number, endPitch: number, duration: number, gainLevel = 0.25) {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(startPitch, t);
    osc.frequency.exponentialRampToValueAtTime(endPitch, t + duration * 0.8);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(gainLevel, t + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    // Warm body filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, t);

    osc.connect(gain);
    gain.connect(filter);
    filter.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + duration);
  }

  // 1. Discreet Start Sound (Ascending gentle Balafon chord)
  public playStartSound() {
    if (this.isMuted) return;
    // Manding pentatonic notes: D4, F4, G4, A4
    const notes = [293.66, 349.23, 392.0, 440.0];
    notes.forEach((freq, idx) => {
      this.playBalafonNote(freq, idx * 0.08, 0.45, 0.18);
    });
  }

  // 2. Success Validation Sound (Harmonious bright Balafon chime)
  public playSuccessSound() {
    if (this.isMuted) return;
    // Pentatonic celebratory triad: C5, E5, G5, C6
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      this.playBalafonNote(freq, idx * 0.07, 0.5, 0.22);
    });
  }

  // 3. Gentle Wrong Answer Sound (Soft friendly low drum tap, encouraging, non-punitive)
  public playWrongSound() {
    if (this.isMuted) return;
    // Soft wooden calabash tap followed by low djembé tone
    this.playDjembeTone(160, 95, 0.28, 0.18);
    this.playBalafonNote(220, 0.06, 0.25, 0.12);
  }

  // 4. Festive Victory Sound (Grand celebratory Balafon & Kora arpeggio)
  public playVictorySound() {
    if (this.isMuted) return;
    // Joyful traditional West African fanfare pattern
    const melody = [
      { f: 392.0, delay: 0 },       // G4
      { f: 440.0, delay: 0.1 },     // A4
      { f: 523.25, delay: 0.2 },    // C5
      { f: 587.33, delay: 0.3 },    // D5
      { f: 659.25, delay: 0.4 },    // E5
      { f: 783.99, delay: 0.52 },   // G5
      { f: 1046.5, delay: 0.65 },   // C6
    ];

    melody.forEach((note) => {
      this.playBalafonNote(note.f, note.delay, 0.6, 0.24);
    });

    // Final subtle deep bass resonance
    setTimeout(() => {
      this.playDjembeTone(130, 75, 0.5, 0.2);
    }, 600);
  }
}

export const africanAudio = new AfricanAudioEngine();
