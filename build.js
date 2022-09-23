import mri from 'mri';
import { build } from 'esbuild';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

const prog = mri(process.argv.slice(2), {
  boolean: ['watch', 'minify'],
});

const baseConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'browser',
  minify: prog.minify,
  jsxFactory: 'React',
  jsxFragment: 'Fragment',
  watch: prog.watch,
  external: [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)],
};

build({
  ...baseConfig,
  format: 'esm',
  outfile: 'dist/index.js',
});
