import { config } from "./config";
import {
	getSettings,
	type Settings,
	type InteractiveElement,
} from "./settings";
import { recordPlayback } from "./statistics";
import { playAudio } from "./audio";

let settings: Settings;

function getInteractiveSelector(): string {
	return (Object.keys(config.interactiveElement) as InteractiveElement[])
		.filter((key) => settings.interactiveElement[key])
		.map((key) => config.interactiveElement[key].selector)
		.join(", ");
}

function handleClick(event: MouseEvent): void {
	const target = event.target;
	if (!(target instanceof Element)) {
		return;
	}

	const selector = getInteractiveSelector();
	if (!selector) {
		return;
	}

	const element = target.closest(selector);
	if (!element || element.matches(":disabled, [aria-disabled='true']")) {
		return;
	}

	void playAudio({ volume: settings.volume })
		.then(recordPlayback)
		.catch(() => undefined);
}

async function initialize(): Promise<void> {
	settings = await getSettings();

	chrome.storage.onChanged.addListener((changes, areaName) => {
		if (areaName !== "local" || !changes["settings"]) {
			return;
		}

		void getSettings().then((value) => {
			settings = value;
		});
	});

	document.addEventListener("click", handleClick);
}

void initialize();
