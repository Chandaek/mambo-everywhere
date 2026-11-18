export interface Statistics {
	totalPlays: number;
	lastPlayedAt: number | null;
}

export const defaultStatistics: Statistics = {
	totalPlays: 0,
	lastPlayedAt: null,
};

export async function getStatistics(): Promise<Statistics> {
	const result = await chrome.storage.local.get("statistics");
	const stored = result["statistics"] as Partial<Statistics> | undefined;

	return {
		totalPlays:
			typeof stored?.totalPlays === "number" ? stored.totalPlays : 0,
		lastPlayedAt:
			typeof stored?.lastPlayedAt === "number"
				? stored.lastPlayedAt
				: null,
	};
}

export async function recordPlayback(): Promise<void> {
	const statistics = await getStatistics();

	await chrome.storage.local.set({
		statistics: {
			totalPlays: statistics.totalPlays + 1,
			lastPlayedAt: Date.now(),
		},
	});
}

export async function resetStatistics(): Promise<void> {
	await chrome.storage.local.set({
		statistics: defaultStatistics,
	});
}
