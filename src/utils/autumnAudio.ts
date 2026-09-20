/**
 * Ambient Autumn Breeze & Rustling Sound Synthesizer using Web Audio API.
 * Synthesizes a gentle, romantic autumn breeze with soft dry leaf rustling
 * and delicate warm harmonic wind chimes in the distance.
 * No external mp3 required, zero network bandwidth, pure smooth audio.
 */

class AutumnAmbientAudio {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private chimeTimer: number | null = null;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start() {
    if (this.isPlaying) return;

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master output gain with gentle fade-in
      const master = this.ctx.createGain();
      master.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      master.gain.exponentialRampToValueAtTime(0.09, this.ctx.currentTime + 2.5);
      master.connect(this.ctx.destination);
      this.masterGain = master;

      // 1. Soft Warm Autumn Breeze (Pink/Brown noise passed through dual smooth resonant filters)
      const sampleRate = this.ctx.sampleRate;
      const bufferLength = sampleRate * 3; // 3-second seamless loop buffer
      const noiseBuffer = this.ctx.createBuffer(2, bufferLength, sampleRate);

      for (let ch = 0; ch < 2; ch++) {
        const channelData = noiseBuffer.getChannelData(ch);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferLength; i++) {
          const white = Math.random() * 2 - 1;
          // Smooth pink/brown filtering for velvety warm breeze
          b0 = 0.992 * b0 + white * 0.05;
          b1 = 0.985 * b1 + white * 0.035;
          b2 = 0.975 * b2 + white * 0.02;
          channelData[i] = (b0 + b1 + b2) * 1.6;
        }
      }

      const breezeSource = this.ctx.createBufferSource();
      breezeSource.buffer = noiseBuffer;
      breezeSource.loop = true;

      // Soft low-pass filter to remove any harshness
      const breezeFilter = this.ctx.createBiquadFilter();
      breezeFilter.type = 'lowpass';
      breezeFilter.frequency.setValueAtTime(320, this.ctx.currentTime);
      breezeFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);

      // Slow romantic breathing LFO (cycle ~7.5 seconds)
      const lfo = this.ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.13, this.ctx.currentTime);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(120, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(breezeFilter.frequency);
      lfo.start();

      const breezeGain = this.ctx.createGain();
      breezeGain.gain.setValueAtTime(0.75, this.ctx.currentTime);

      breezeSource.connect(breezeFilter);
      breezeFilter.connect(breezeGain);
      breezeGain.connect(master);
      breezeSource.start();

      // 2. Whispering Dry Leaf Rustle (High-passed subtle textured air)
      const rustleFilter = this.ctx.createBiquadFilter();
      rustleFilter.type = 'bandpass';
      rustleFilter.frequency.setValueAtTime(1400, this.ctx.currentTime);
      rustleFilter.Q.setValueAtTime(0.8, this.ctx.currentTime);

      const rustleLFO = this.ctx.createOscillator();
      rustleLFO.type = 'sine';
      rustleLFO.frequency.setValueAtTime(0.22, this.ctx.currentTime);
      const rustleLFOGain = this.ctx.createGain();
      rustleLFOGain.gain.setValueAtTime(450, this.ctx.currentTime);
      rustleLFO.connect(rustleLFOGain);
      rustleLFOGain.connect(rustleFilter.frequency);
      rustleLFO.start();

      const rustleGain = this.ctx.createGain();
      rustleGain.gain.setValueAtTime(0.15, this.ctx.currentTime);

      breezeSource.connect(rustleFilter);
      rustleFilter.connect(rustleGain);
      rustleGain.connect(master);

      // 3. Romantic distant harmonic pentatonic bell chimes (warm acoustic vibe)
      const pentatonicNotes = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5]; // C5, D5, E5, G5, A5, C6
      const playSoftChime = () => {
        if (!this.isPlaying || !this.ctx || !this.masterGain) return;
        try {
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const chimeGain = this.ctx.createGain();

          // Pick a soothing pentatonic frequency
          const freq = pentatonicNotes[Math.floor(Math.random() * pentatonicNotes.length)];
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          // Very soft bell envelope: sudden gentle onset with long acoustic decay
          chimeGain.gain.setValueAtTime(0.0001, now);
          chimeGain.gain.exponentialRampToValueAtTime(0.022, now + 0.08);
          chimeGain.gain.exponentialRampToValueAtTime(0.00001, now + 3.2);

          osc.connect(chimeGain);
          chimeGain.connect(this.masterGain);

          osc.start(now);
          osc.stop(now + 3.3);
        } catch {
          // ignore
        }

        // Schedule next soft chime randomly between 5 to 11 seconds
        const nextDelay = 5000 + Math.random() * 6000;
        this.chimeTimer = window.setTimeout(playSoftChime, nextDelay);
      };

      // Start the first chime after 2 seconds
      this.chimeTimer = window.setTimeout(playSoftChime, 2200);

      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  public stop() {
    if (!this.isPlaying || !this.ctx) return;

    try {
      if (this.chimeTimer) {
        clearTimeout(this.chimeTimer);
        this.chimeTimer = null;
      }

      if (this.masterGain && this.ctx) {
        this.masterGain.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + 1.2);
      }

      setTimeout(() => {
        if (this.ctx) {
          this.ctx.close();
          this.ctx = null;
        }
        this.isPlaying = false;
      }, 1250);
    } catch {
      this.isPlaying = false;
    }
  }
}

export const autumnAudio = new AutumnAmbientAudio();

