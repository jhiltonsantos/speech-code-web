import * as esbuild from 'esbuild';

const shared = {
	bundle: true,
	platform: 'node',
	format: 'cjs',
	external: ['electron'],
	logLevel: 'info',
	banner: {
		js: 'var import_meta_url=require("url").pathToFileURL(__filename).href;'
	},
	define: {
		'import.meta.url': 'import_meta_url'
	}
};

await esbuild.build({
	...shared,
	entryPoints: ['electron/main.ts'],
	outfile: 'dist-electron/main.cjs'
});

await esbuild.build({
	...shared,
	entryPoints: ['electron/preload.ts'],
	outfile: 'dist-electron/preload.cjs'
});
