import alias from '@learning-mono/rollup-alias-plugin'
import Vue from '@vitejs/plugin-vue'
import crypto from 'crypto'
import path from 'path'
import { defineConfig } from 'vite'
import VueTypeImports from 'vite-plugin-vue-type-imports'

export default defineConfig({
  css: {
    modules: {
      generateScopedName(name, filename) {
        const [file] = path.basename(filename, '.css').split('.')
        const hash = Buffer.from(filename + name).toString('base64url').slice(-5)

        return `${file}_${name}_${hash}`
      },
    },
  },
  assetsInclude: /\.(pdf|jpg|png|svg)$/,
  publicDir: path.resolve(__dirname, './src/public'),
  plugins: [
    VueTypeImports(),
    Vue(),
    alias(),
  ],
})
