import * as Tone from 'tone';

export default class MusicalEntity {
    private synth: Tone.FMSynth;
    constructor() {
        this.synth = new Tone.FMSynth({
            harmonicity: 3,
            modulationIndex: 10,
            oscillator: { type: 'sine' },
            modulation: { type: 'square' },
            envelope: {
                attack: 0.01,
                decay: 1.2,
                sustain: 0.3,
                release: 2
            },
            modulationEnvelope: {
                attack: 0.2,
                decay: 0.3,
                sustain: 0.7,
                release: 0.8
            }
        }).toDestination();

        const chorus = new Tone.Chorus(4, 2.5, 0.5).start();
        const reverb = new Tone.Reverb(5).toDestination();

        this.synth.connect(chorus);
        chorus.connect(reverb);
    }
    async trigger() {
        await Tone.start();

        this.synth.triggerAttackRelease("C4", 1)
    }
}