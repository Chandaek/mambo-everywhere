const audio = new Audio(chrome.runtime.getURL("assets/audio/mambo.mp3"));
const context = new AudioContext();

const source = context.createMediaElementSource(audio);
const gain = context.createGain();

source.connect(gain);
gain.connect(context.destination);

export interface PlaybackOptions {
	volume?: number;
	playbackRate?: number;
}

export async function playAudio(options: PlaybackOptions = {}): Promise<void> {
	await context.resume();

	audio.pause();
	audio.currentTime = 0;

	gain.gain.value = options.volume ?? 1;
	audio.playbackRate = options.playbackRate ?? 1;
	audio.preservesPitch = false;

	await audio.play();
}

export function stopAudio(): void {
	audio.pause();
	audio.currentTime = 0;
}
