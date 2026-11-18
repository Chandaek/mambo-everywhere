
import esbuild from "esbuild";
import fs from "node:fs/promises";
import path from "node:path";
import { createWriteStream } from "node:fs";
import { fileURLToPath } from "node:url";
import { ZipArchive } from "archiver";

const root = path.dirname(fileURLToPath(import.meta.url));

const packageJson = JSON.parse(
	await fs.readFile(path.join(root, "package.json"), "utf8")
);

const manifest = JSON.parse(
	await fs.readFile(path.join(root, "manifest.json"), "utf8")
);

const distDirectory = path.join(root, "dist");
const buildDirectory = path.join(root, "build");
const popupDirectory = path.join(distDirectory, "popup");

const archiveName = `${packageJson.name}-v${manifest.version}.zip`;

await fs.rm(distDirectory, { recursive: true, force: true });
await fs.mkdir(popupDirectory, { recursive: true });
await fs.mkdir(buildDirectory, { recursive: true });

await esbuild.build({
	entryPoints: [
		path.join(root, "src/content.ts"),
		path.join(root, "src/popup/popup.ts"),
	],
	bundle: true,
	format: "iife",
	outdir: distDirectory,
	target: "chrome120",
});

await fs.copyFile(
	path.join(root, "manifest.json"),
	path.join(distDirectory, "manifest.json")
);

await fs.copyFile(
	path.join(root, "src/popup/popup.html"),
	path.join(popupDirectory, "popup.html")
);

await fs.copyFile(
	path.join(root, "src/popup/popup.css"),
	path.join(popupDirectory, "popup.css")
);

await fs.cp(
	path.join(root, "assets"),
	path.join(distDirectory, "assets"),
	{ recursive: true }
);

const archivePath = path.join(buildDirectory, archiveName);

await new Promise((resolve, reject) => {
	const output = createWriteStream(archivePath);
	const archive = new ZipArchive({ zlib: { level: 9 } });

	output.on("close", resolve);
	output.on("error", reject);
	archive.on("error", reject);

	archive.pipe(output);
	archive.directory(distDirectory, false);
	archive.finalize();
});

console.log(`Build completed: ${archivePath}`);
