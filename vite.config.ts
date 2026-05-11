import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import json5Plugin from 'vite-plugin-json5'
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import findUnusedFiles from "vite-plugin-unused-files";
import { VitePWA } from 'vite-plugin-pwa';
// https://vite.dev/config/
export default defineConfig({
  plugins:[
    react({babel:{plugins:[['babel-plugin-react-compiler']],},}),
    json5Plugin(),
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
        {name:'removeViewBox',active:false},
        {name:'sortAttrs'},
      ],},
    }),
  ],
  build:{manifest: true,}
});