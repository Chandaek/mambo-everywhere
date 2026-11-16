import { playAudio } from "./audio";

function initialize(): void {
	document.addEventListener("click", (event) => {
		const target = event.target;
		if (!(target instanceof Element)) {
			return;
		}

		const button = target.closest(
			'button, input[type="button"], input[type="submit"], [role="button"]',
		);
		if (!button) {
			return;
		}

		void playAudio();
	});
}

initialize();
