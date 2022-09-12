import mri from 'mri';
import { build } from 'esbuild';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

const prog = mri(process.argv.slice(2), {
  boolean: ['watch', 'minify'],
});

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'browser',
  outfile: 'dist/index.js',
  format: 'esm',
  minify: prog.minify,
  jsxFactory: 'React',
  jsxFragment: 'Fragment',
  watch: prog.watch,
  external: [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)],
});
