import { defineConfig, type PluginOption } from 'vite'
// import react from '@vitejs/plugin-react'
import react from "@vitejs/plugin-react-swc"
import { visualizer } from "rollup-plugin-visualizer";
import json5Plugin from 'vite-plugin-json5'
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import findUnusedFiles from "vite-plugin-unused-files";
import { VitePWA } from 'vite-plugin-pwa';
import viteConvertImages from 'vite-convert-images';
// https://vite.dev/config/
export default defineConfig({
  plugins:[
    react(),
    json5Plugin(),
		viteConvertImages({
      formats:["png","jpg"],
      enableLogs:true,
      assetsDir:"/public/",
    }),
    findUnusedFiles({
      include:['src/**/*'],
      exclude:['src/**/*.test.ts','src/**/*.d.ts'],
      alias:{ 
        '@':'src',
        '~':'public',
      },
      dryRun: true,
    }),
    VitePWA({
      registerType:'autoUpdate',
      workbox:{
        maximumFileSizeToCacheInBytes:80000000,
      },
      manifest: {
        name: 'Beansite 8.1',
        short_name: 'Beansite',
        icons:[{
          "src": "/assets/favicon_modern.png",
          "sizes": "484x512",
          "type": "image/png"
        },],
      }
    }),
    ViteImageOptimizer({
      png:{quality:80},
      jpeg:{quality:75},
      webp:{quality:80},
      avif:{quality:70},
      svg:{plugins:[
        // {name:'removeViewBox',params:{active:false}},
        {name:'sortAttrs'},
        {name:"cleanupAttrs",params:{newlines:true,trim:true}},
        {name:"removeComments"},
        {name:"removeDoctype"},
      ],},
      cache:true,
      cacheLocation:"/.imgcache/",
    }),
    visualizer({
      // filename:"/public/stats.html",
      gzipSize:true,
      brotliSize:true,
    }) as PluginOption,
  ],
  build:{manifest: true,}
});