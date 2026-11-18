import { config } from "../config";
import {
	getSettings,
	type Settings,
	type InteractiveElement,
} from "../settings";
import { getStatistics, resetStatistics } from "../statistics";

const elementContainer = document.querySelector<HTMLDivElement>(
	"#interactive-elements",
);
const volumeInput = document.querySelector<HTMLInputElement>("#volume");
const volumeValue = document.querySelector<HTMLOutputElement>("#volume-value");
const totalPlays = document.querySelector<HTMLElement>("#total-plays");
const lastPlayed = document.querySelector<HTMLElement>("#last-played");
const resetButton =
	document.querySelector<HTMLButtonElement>("#reset-statistics");

let settings: Settings;

async function saveSettings(): Promise<void> {
	await chrome.storage.local.set({ settings });
}

function createInteractiveElementSettings(): void {
	if (!elementContainer) {
		return;
	}

	elementContainer.replaceChildren();

	for (const key of Object.keys(
		config.interactiveElement,
	) as InteractiveElement[]) {
		const element = config.interactiveElement[key];

		const row = document.createElement("label");
		row.className = "setting-row";

		const name = document.createElement("span");
		name.textContent = element.label;

		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.checked = settings.interactiveElement[key];

		checkbox.addEventListener("change", () => {
			settings.interactiveElement[key] = checkbox.checked;
			void saveSettings();
		});

		row.append(name, checkbox);
		elementContainer.append(row);
	}
}

function initializeVolume(): void {
	if (!volumeInput || !volumeValue) {
		return;
	}

	volumeInput.value = String(Math.round(settings.volume * 100));
	volumeValue.value = `${volumeInput.value}%`;

	volumeInput.addEventListener("input", () => {
		if (!volumeInput || !volumeValue) {
			return;
		}

		volumeValue.value = `${volumeInput.value}%`;
	});

	volumeInput.addEventListener("change", () => {
		if (!volumeInput) {
			return;
		}

		settings.volume = Number(volumeInput.value) / 100;
		void saveSettings();
	});
}

async function updateStatistics(): Promise<void> {
	const statistics = await getStatistics();

	if (totalPlays) {
		totalPlays.textContent = String(statistics.totalPlays);
	}

	if (lastPlayed) {
		lastPlayed.textContent = statistics.lastPlayedAt
			? new Date(statistics.lastPlayedAt).toLocaleString()
			: "Never";
	}
}

function initializeStatistics(): void {
	resetButton?.addEventListener("click", async () => {
		await resetStatistics();
		await updateStatistics();
	});
}

async function initialize(): Promise<void> {
	settings = await getSettings();

	createInteractiveElementSettings();
	initializeVolume();
	initializeStatistics();

	await updateStatistics();
}

void initialize();
