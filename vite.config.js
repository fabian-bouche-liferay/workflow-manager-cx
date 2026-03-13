import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

export default defineConfig({
    base: '/o/workflow-manager-cx',
    plugins: [react()],
    build: {
        rollupOptions: {
            external: [
                '@clayui/*',
                'react',
                'react-dom'
            ]
        },
        outDir: path.resolve(__dirname, 'build/static'),
        emptyOutDir: true,
        assetsDir: 'assets',
    }
});