import Vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import VueTypeImports from 'vite-plugin-vue-type-imports'
import alias from '@learning-mono/rollup-alias-plugin'

export default defineConfig({
  assetsInclude: /\.(pdf|jpg|png|svg)$/,
  publicDir: path.resolve(__dirname, './src/public'),
  plugins: [
    VueTypeImports(),
    Vue(),
    alias(),
  ],
})
