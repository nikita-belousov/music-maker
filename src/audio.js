export default class Audio {
  constructor(context, type) {
    this.context = context
    this.type = type
  }

  init() {
    this.oscillator = this.context.createOscillator()
    this.gainNode = this.context.createGain()

    this.oscillator.connect(this.gainNode)
    this.gainNode.connect(this.context.destination)
    this.oscillator.type = this.type
  }

  play(value, time, duration) {
    this.init()

    this.oscillator.frequency.value = value
    this.gainNode.gain.setValueAtTime(1, time)

    this.oscillator.start(time)
    this.stop(time, duration)
  }

  stop(time, duration) {
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + duration)
    this.oscillator.stop(time + duration)
  }
}
