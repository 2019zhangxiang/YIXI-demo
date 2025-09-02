/**
 * Vite 构建工具配置文件
 * 配置开发服务器、构建选项、插件等
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Vite配置 - 详细配置说明: https://vitejs.dev/config/
export default defineConfig({
  // 插件配置
  plugins: [react()],
  
  // 模块解析配置
  resolve: {
    alias: {
      // 配置路径别名
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@store': resolve(__dirname, 'src/store'),
      '@types': resolve(__dirname, 'src/types'),
      '@config': resolve(__dirname, 'src/config'),
      '@assets': resolve(__dirname, 'src/assets')
    }
  },

  // CSS配置
  css: {
    preprocessorOptions: {
      less: {
        // 启用JavaScript表达式支持
        javascriptEnabled: true,
        // Ant Design主题变量
        modifyVars: {
          '@primary-color': '#1890ff',
          '@border-radius-base': '6px'
        }
      }
    }
  },

  // 构建配置
  build: {
    // 构建输出目录
    outDir: 'dist',
    // 静态资源目录
    assetsDir: 'assets',
    // 启用/禁用 CSS 代码拆分
    cssCodeSplit: true,
    // 构建后是否生成 source map 文件
    sourcemap: false,
    // chunk 大小警告的限制（以 kbs 为单位）
    chunkSizeWarningLimit: 1000,
    // rollup 配置
    rollupOptions: {
      output: {
        // 手动分包配置
        manualChunks: {
          // React 相关
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Ant Design 相关
          'antd-vendor': ['antd', '@ant-design/icons'],
          // Redux 相关
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
          // 图表库
          'chart-vendor': ['recharts'],
          // 工具库
          'utils-vendor': ['axios', 'dayjs', 'classnames']
        },
        // 文件命名规则
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        // 生产环境移除 console
        drop_console: true,
        drop_debugger: true
      }
    }
  },

  // 开发服务器配置
   server: {
     port: 5173,
     host: true,
     open: true,
     cors: true,
     // API代理配置 - 将/api请求代理到后端服务
     proxy: {
       '/api': {
         target: 'http://localhost:8080',
         changeOrigin: true,
         rewrite: (path) => path.replace(/^\/api/, '')
       }
     }
   }
})