import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'; // 新增 path 模块导入
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@use "@/assets/styles/variables.scss" as *;',
            },
        },
    },
    // 新增 ESLint 配置
    esbuild: {
        loader: 'ts',
        include: /src\/.*\.[tj]sx?$/,
    },
    server: {
        port: 3002,
        host: '0.0.0.0', // 允许通过IP地址访问
        hmr: {
            overlay: false,
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
