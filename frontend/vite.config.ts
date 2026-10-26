import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: { '/api': 'http://localhost:3000' },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    css: {
        modules: {
            // camelCaseOnly оставляет только camelCase,
            // camelCase сохранит и исходное имя с тире, и добавит camelCase версию
            localsConvention: 'camelCaseOnly',
        },
    },
});
