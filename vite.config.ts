import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'; // ← import plugin này
// https://vite.dev/config/


const cesiumBuild = path.resolve(__dirname, 'node_modules/cesium/Build/Cesium');const cesiumBaseUrl = 'cesium';
export default defineConfig({
  plugins: [react(), tailwindcss(), viteStaticCopy({
      targets: [
        { src: path.join(cesiumBuild, 'ThirdParty/*'), dest: cesiumBaseUrl + '/ThirdParty' },
        { src: path.join(cesiumBuild, 'Assets/*'), dest: cesiumBaseUrl + '/Assets' },
        { src: path.join(cesiumBuild, 'Widgets/*'), dest: cesiumBaseUrl + '/Widgets' },
        { src: path.join(cesiumBuild, 'Workers/*'), dest: cesiumBaseUrl + '/Workers' },
      ],
    }),],
  resolve: {
  alias: [
    {
      find: 'cesium',
      replacement: path.resolve(__dirname, 'node_modules/cesium/Build/Cesium'),
    },
    {
      find: '@',
      replacement: path.resolve(__dirname, './src'),
    },
  ],
},
  define: {
    CESIUM_BASE_URL: JSON.stringify(cesiumBaseUrl),
  },
  build: {
    assetsInlineLimit: 0,
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  optimizeDeps: {
    include: ['cesium'], // Buộc Vite optimize cesium đúng cách
  },
})
