import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
      'strap-trousers': resolve(__dirname, '../src/index.ts')
    }
  },
  server: {
    port: 3000,
    open: true,
    // 优化热重载配置，避免自定义元素重复注册问题
    hmr: {
      overlay: true
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  // 优化构建配置
  optimizeDeps: {
    exclude: ['lit', 'lit/decorators.js']
  }
})