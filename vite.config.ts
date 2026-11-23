import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/zirin2/' : '/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'github-pages-spa-fallback',
      apply: 'build',
      enforce: 'post',
      generateBundle(_outputOptions, bundle) {
        const indexHtml = bundle['index.html'];
        if (!indexHtml || indexHtml.type !== 'asset') {
          this.error('The generated index.html is missing; cannot create the Pages fallback.');
        }

        this.emitFile({
          type: 'asset',
          fileName: '404.html',
          source: indexHtml.source,
        });
      },
    },
  ],
}));
