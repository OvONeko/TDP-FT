import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import {fileURLToPath, URL} from 'node:url'
import Components from 'unplugin-vue-components/vite'

import {defineConfig} from 'vite'
import markdown from './vite/markdown'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx(), markdown(), Components({ dts: true, dirs: ['src/components', 'src/views'] })],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    base: '/TDP-FT/'
})
