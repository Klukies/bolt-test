import { reactRouter } from '@react-router/dev/vite';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import { defineConfig } from 'vite';
import { run } from 'vite-plugin-run';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    cssMinify: 'lightningcss',
    target: 'es2022',
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('last 2 versions')),
    },
  },
  plugins: [
    reactRouter(),
    run([
      {
        name: 'i18n resources',
        run: ['npm', 'run', 'i18n:resources'],
        pattern: 'app/modules/i18n/locales/en/translation.json',
        build: false,
      },
      {
        name: 'icons',
        run: ['npm', 'run', 'build:icons'],
        pattern: 'public/icons/*',
        build: false,
      },
    ]),
    tsconfigPaths(),
  ],
});
