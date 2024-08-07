import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import VueDevTools from 'vite-plugin-vue-devtools';
import svgLoader from 'vite-svg-loader';
// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        include: ['lottie-web'],
      },
    plugins: [
        vue(),
        svgLoader(),
        // VueDevTools(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});
