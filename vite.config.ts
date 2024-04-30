import path from 'path';

/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
/* eslint-enable  import/no-extraneous-dependencies */
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ command }) => ({
    base: command === 'build' ? '/Yau1heni/' : '/',
    plugins: [
        react(),
        svgr({
            include: '**/*.svg?react',
        }),
    ],
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                modifyVars: { '@primary-color': '#2F54EB' },
            },
        },
    },
    server: {
        host: true,
        port: 3000,
    },

    resolve: {
        alias: {
            '@public': path.resolve(__dirname, 'public'),
            '@app': path.resolve(__dirname, 'app'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@constants': path.resolve(__dirname, 'src/constants'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@redux': path.resolve(__dirname, 'src/redux'),
            '@common-types': path.resolve(__dirname, 'src/common-types'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@services': path.resolve(__dirname, 'src/services'),
        },
    },
}));
