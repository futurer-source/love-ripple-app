// Generate a smooth, dreamy chime sound using Web Audio API
export const createChimeSound = (): AudioBuffer | null => {
  try {
    const audioContext = new AudioContext();
    const sampleRate = audioContext.sampleRate;
    const duration = 1.5; // 1.5 seconds
    const numSamples = sampleRate * duration;
    
    // Create audio buffer
    const audioBuffer = audioContext.createBuffer(1, numSamples, sampleRate);
    const channelData = audioBuffer.getChannelData(0);
    
    // Create a pleasant chime with multiple harmonics
    const baseFreq = 523.25; // C5 note
    const harmonics = [1, 2, 3, 4]; // Harmonic series
    const harmonicWeights = [1.0, 0.5, 0.3, 0.2];
    
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      let sample = 0;
      
      // Add harmonics
      harmonics.forEach((harmonic, idx) => {
        const freq = baseFreq * harmonic;
        sample += Math.sin(2 * Math.PI * freq * t) * harmonicWeights[idx];
      });
      
      // Apply envelope (ADSR-like)
      const attackTime = 0.05;
      const decayTime = 0.2;
      const sustainLevel = 0.6;
      const releaseTime = 1.0;
      
      let envelope = 1;
      if (t < attackTime) {
        envelope = t / attackTime;
      } else if (t < attackTime + decayTime) {
        envelope = 1 - (1 - sustainLevel) * ((t - attackTime) / decayTime);
      } else if (t < duration - releaseTime) {
        envelope = sustainLevel;
      } else {
        envelope = sustainLevel * (1 - (t - (duration - releaseTime)) / releaseTime);
      }
      
      channelData[i] = sample * envelope * 0.3; // Volume at 30%
    }
    
    return audioBuffer;
  } catch (error) {
    console.error('Failed to create chime sound:', error);
    return null;
  }
};

export class ChimePlayer {
  private audioContext: AudioContext | null = null;
  private chimeBuffer: AudioBuffer | null = null;
  
  async initialize() {
    try {
      this.audioContext = new AudioContext();
      this.chimeBuffer = createChimeSound();
      console.log('Chime sound initialized');
    } catch (error) {
      console.error('Failed to initialize chime player:', error);
    }
  }
  
  async play() {
    if (!this.audioContext || !this.chimeBuffer) {
      console.warn('Chime player not initialized');
      return;
    }
    
    try {
      // Resume audio context if suspended (browser autoplay policy)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      
      const source = this.audioContext.createBufferSource();
      source.buffer = this.chimeBuffer;
      source.connect(this.audioContext.destination);
      source.start(0);
      
      console.log('Playing chime sound');
    } catch (error) {
      console.error('Failed to play chime:', error);
    }
  }
  
  cleanup() {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}
