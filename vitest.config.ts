import alias from '@learning-mono/rollup-alias-plugin'
import Vue from '@vitejs/plugin-vue'
import VueTypeImports from 'vite-plugin-vue-type-imports'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    testTimeout: 1000000,
  },
  plugins: [
    VueTypeImports(),
    Vue(),
    alias(),
  ],
})
