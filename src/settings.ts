import { config } from "./config";

export type InteractiveElement = keyof typeof config.interactiveElement;

export interface Settings {
	interactiveElement: Record<InteractiveElement, boolean>;
	volume: number;
}

export const defaultSettings: Settings = {
	interactiveElement: Object.fromEntries(
		Object.keys(config.interactiveElement).map((key) => [key, true]),
	) as Record<InteractiveElement, boolean>,
	volume: 1,
};

export async function getSettings(): Promise<Settings> {
	const result = await chrome.storage.local.get("settings");
	const stored = result["settings"] as Partial<Settings> | undefined;

	const interactiveElement = { ...defaultSettings.interactiveElement };

	for (const key of Object.keys(
		config.interactiveElement,
	) as InteractiveElement[]) {
		const value = stored?.interactiveElement?.[key];

		if (typeof value === "boolean") {
			interactiveElement[key] = value;
		}
	}

	const volume = stored?.volume;

	return {
		interactiveElement,
		volume:
			typeof volume === "number"
				? Math.min(1, Math.max(0, volume))
				: defaultSettings.volume,
	};
}
