if (window.AudioNode) {
  const Tone = require('tone')

  const synth = new Tone.PolySynth(3, Tone.Synth).toMaster()
  synth.set({
    envelope: {
      attack: 0.005,
      sustain: 1,
      decay: 10,
      release: 2
    },
    portamento: 0
  })

  const noteIdToPitches = {
    0: ['C3', 'C4', 'G4'],
    1: ['C3', 'D4', 'Ab4'],
    2: ['C3', 'Eb4', 'Bb4'],
    3: ['C3', 'F'],
    4: ['C3', 'G'],
    5: ['C3', 'Ab'],
    6: ['C3', 'Bb'],
    7: ['C3', 'C5']
  }

  module.exports = function play (noteId) {
    const pitches = noteIdToPitches[noteId]
    synth.triggerAttackRelease(pitches, '4n')
  }
} else {
  module.exports = () => {}
}
