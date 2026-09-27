/**
 * BUANA ACADEMY - Web Audio API Sound FX Engine
 * Generates instant, zero-latency synthetic sound effects for:
 * 1. Lego Brick Snap / Click (Hover & Click)
 * 2. Flying Lego Airplane Whoosh & Propeller Turbo
 * 3. Success / Confetti Fanfare
 * 4. Mode Switch
 */

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.enabled = true;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  toggleSound() {
    this.enabled = !this.enabled;
    const btn = document.getElementById("btn-sound-toggle");
    if (btn) {
      btn.innerHTML = this.enabled ? "🔊 Suara Lego: ON" : "🔇 Suara: MUTE";
      btn.classList.toggle("muted", !this.enabled);
    }
    if (this.enabled) {
      this.playClick();
    }
    return this.enabled;
  }

  /**
   * Lego Brick Snap on Click
   */
  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    // Transient 1: Sharp high click (snap)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(3200, now);
    osc1.frequency.exponentialRampToValueAtTime(800, now + 0.035);

    gain1.gain.setValueAtTime(0.4, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.04);

    // Transient 2: Low plastic thud
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(520, now + 0.008);
    osc2.frequency.exponentialRampToValueAtTime(120, now + 0.05);

    gain2.gain.setValueAtTime(0.35, now + 0.008);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.start(now + 0.008);
    osc2.stop(now + 0.06);
  }

  /**
   * Subtle Lego Brick Tap on Hover
   */
  playHover() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1900, now);
    osc.frequency.exponentialRampToValueAtTime(950, now + 0.02);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.025);
  }

  /**
   * Flying Lego Plane Turbo Whoosh
   */
  playPlaneWhoosh() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.4);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.45);
  }

  /**
   * Joyful Success Chime
   */
  playSuccessFanfare() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const startTime = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const noteTime = startTime + idx * 0.1;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.25, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.26);
    });
  }
}

window.buanaSound = new SoundEngine();

// Auto attach sound triggers
document.addEventListener("DOMContentLoaded", () => {
  const attachSounds = () => {
    document.querySelectorAll("button, a.btn-lego, .lego-nav-brick, .bank-card-item, .program-card, .session-card, .feature-card, .step-item").forEach(el => {
      if (!el.dataset.soundAttached) {
        el.dataset.soundAttached = "true";
        el.addEventListener("mouseenter", () => window.buanaSound.playHover());
        el.addEventListener("click", () => window.buanaSound.playClick());
      }
    });
  };

  attachSounds();
  const observer = new MutationObserver(() => attachSounds());
  observer.observe(document.body, { childList: true, subtree: true });

  window.addEventListener("click", () => window.buanaSound.init(), { once: true });
  window.addEventListener("touchstart", () => window.buanaSound.init(), { once: true });
});
