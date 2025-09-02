// vite.config.ts
import { defineConfig } from "file:///Users/yixiu/Desktop/TRAE-V2/node_modules/vite/dist/node/index.js";
import react from "file:///Users/yixiu/Desktop/TRAE-V2/node_modules/@vitejs/plugin-react/dist/index.js";
import { resolve } from "path";
import autoprefixer from "file:///Users/yixiu/Desktop/TRAE-V2/node_modules/autoprefixer/lib/autoprefixer.js";
import cssnano from "file:///Users/yixiu/Desktop/TRAE-V2/node_modules/cssnano/src/index.js";
var __vite_injected_original_dirname = "/Users/yixiu/Desktop/TRAE-V2";
var vite_config_default = defineConfig(({ command, mode }) => {
  const isDev = command === "serve";
  const isProd = mode === "production";
  return {
    // 插件配置
    plugins: [
      react({
        // 生产环境优化
        babel: isProd ? {
          plugins: [
            // 移除console.log
            ["transform-remove-console", { exclude: ["error", "warn"] }]
          ]
        } : void 0
      })
    ],
    // 模块解析配置
    resolve: {
      alias: {
        // 配置路径别名
        "@": resolve(__vite_injected_original_dirname, "src"),
        "@components": resolve(__vite_injected_original_dirname, "src/components"),
        "@pages": resolve(__vite_injected_original_dirname, "src/pages"),
        "@utils": resolve(__vite_injected_original_dirname, "src/utils"),
        "@hooks": resolve(__vite_injected_original_dirname, "src/hooks"),
        "@store": resolve(__vite_injected_original_dirname, "src/store"),
        "@types": resolve(__vite_injected_original_dirname, "src/types"),
        "@config": resolve(__vite_injected_original_dirname, "src/config"),
        "@assets": resolve(__vite_injected_original_dirname, "src/assets")
      }
    },
    // CSS配置
    css: {
      modules: {
        // CSS Modules配置
        localsConvention: "camelCase",
        generateScopedName: isDev ? "[name]__[local]___[hash:base64:5]" : "[hash:base64:8]"
      },
      preprocessorOptions: {
        less: {
          // 启用JavaScript表达式支持
          javascriptEnabled: true,
          // 全局导入变量文件
          additionalData: '@import "./src/styles/variables.less";',
          // Ant Design主题变量
          modifyVars: {
            "@primary-color": "#1890ff",
            "@border-radius-base": "6px"
          }
        }
      },
      postcss: {
        plugins: [
          // PostCSS插件
          autoprefixer(),
          ...isProd ? [
            cssnano({
              preset: "default"
            })
          ] : []
        ]
      }
    },
    // 开发服务器配置
    server: {
      port: 3e3,
      host: true,
      open: true,
      cors: true,
      // API代理配置
      proxy: {
        "/api": {
          target: "http://localhost:8080",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    },
    // 预览服务器配置
    preview: {
      port: 4173,
      host: true,
      open: true
    },
    // 构建配置
    build: {
      target: "es2015",
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: isDev || mode === "staging",
      minify: isProd ? "terser" : false,
      // Terser配置
      terserOptions: isProd ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.log"]
        },
        format: {
          comments: false
        }
      } : void 0,
      // 代码分割配置
      rollupOptions: {
        input: {
          main: resolve(__vite_injected_original_dirname, "index.html")
        },
        output: {
          // 手动分割chunks
          manualChunks: {
            // 第三方库
            vendor: ["react", "react-dom"],
            antd: ["antd"],
            charts: ["@ant-design/charts"],
            utils: ["lodash", "dayjs", "axios"],
            // 路由相关
            router: ["react-router-dom"],
            // 状态管理
            store: ["@reduxjs/toolkit", "react-redux"]
          },
          // 文件命名
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId;
            if (facadeModuleId) {
              if (facadeModuleId.includes("pages/")) {
                const pageName = facadeModuleId.split("pages/")[1].split("/")[0];
                return `pages/${pageName}/[name]-[hash].js`;
              }
              if (facadeModuleId.includes("components/")) {
                return "components/[name]-[hash].js";
              }
            }
            return "chunks/[name]-[hash].js";
          },
          entryFileNames: "js/[name]-[hash].js",
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split(".");
            const ext = info[info.length - 1];
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/.test(assetInfo.name)) {
              return `media/[name]-[hash].${ext}`;
            }
            if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
              return `images/[name]-[hash].${ext}`;
            }
            if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
              return `fonts/[name]-[hash].${ext}`;
            }
            return `assets/[name]-[hash].${ext}`;
          }
        }
      },
      // 性能预算
      chunkSizeWarningLimit: 1500,
      // 资源内联阈值
      assetsInlineLimit: 4096,
      // CSS代码分割
      cssCodeSplit: true,
      // 生成manifest
      manifest: true,
      // 清空输出目录
      emptyOutDir: true
    },
    // 依赖优化
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "antd",
        "@ant-design/icons",
        "lodash",
        "dayjs",
        "axios"
      ]
    },
    // 环境变量
    define: {
      __DEV__: isDev,
      __PROD__: isProd,
      __VERSION__: JSON.stringify(process.env.npm_package_version || "1.0.0")
    },
    // ESBuild配置
    esbuild: {
      // 移除调试代码
      drop: isProd ? ["console", "debugger"] : [],
      // 法律注释
      legalComments: "none"
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMveWl4aXUvRGVza3RvcC9UUkFFLVYyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMveWl4aXUvRGVza3RvcC9UUkFFLVYyL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy95aXhpdS9EZXNrdG9wL1RSQUUtVjIvdml0ZS5jb25maWcudHNcIjsvKipcbiAqIFZpdGUgXHU2Nzg0XHU1RUZBXHU1REU1XHU1MTc3XHU5MTREXHU3RjZFXHU2NTg3XHU0RUY2XG4gKiBcdTkxNERcdTdGNkVcdTVGMDBcdTUzRDFcdTY3MERcdTUyQTFcdTU2NjhcdTMwMDFcdTY3ODRcdTVFRkFcdTkwMDlcdTk4NzlcdTMwMDFcdTYzRDJcdTRFRjZcdTdCNDlcbiAqL1xuXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcidcbmltcG9ydCBjc3NuYW5vIGZyb20gJ2Nzc25hbm8nXG5cbi8vIFZpdGVcdTkxNERcdTdGNkUgLSBcdThCRTZcdTdFQzZcdTkxNERcdTdGNkVcdThCRjRcdTY2MEU6IGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XG4gIGNvbnN0IGlzRGV2ID0gY29tbWFuZCA9PT0gJ3NlcnZlJ1xuICBjb25zdCBpc1Byb2QgPSBtb2RlID09PSAncHJvZHVjdGlvbidcblxuICByZXR1cm4ge1xuICAgIC8vIFx1NjNEMlx1NEVGNlx1OTE0RFx1N0Y2RVxuICAgIHBsdWdpbnM6IFtcbiAgICAgIHJlYWN0KHtcbiAgICAgICAgLy8gXHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzXHU0RjE4XHU1MzE2XG4gICAgICAgIGJhYmVsOiBpc1Byb2QgPyB7XG4gICAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICAgLy8gXHU3OUZCXHU5NjY0Y29uc29sZS5sb2dcbiAgICAgICAgICAgIFsndHJhbnNmb3JtLXJlbW92ZS1jb25zb2xlJywgeyBleGNsdWRlOiBbJ2Vycm9yJywgJ3dhcm4nXSB9XVxuICAgICAgICAgIF1cbiAgICAgICAgfSA6IHVuZGVmaW5lZFxuICAgICAgfSlcbiAgICBdLFxuICAgIFxuICAgIC8vIFx1NkEyMVx1NTc1N1x1ODlFM1x1Njc5MFx1OTE0RFx1N0Y2RVxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgIC8vIFx1OTE0RFx1N0Y2RVx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgICAgICdAY29tcG9uZW50cyc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbXBvbmVudHMnKSxcbiAgICAgICAgJ0BwYWdlcyc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3BhZ2VzJyksXG4gICAgICAgICdAdXRpbHMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy91dGlscycpLFxuICAgICAgICAnQGhvb2tzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaG9va3MnKSxcbiAgICAgICAgJ0BzdG9yZSc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3N0b3JlJyksXG4gICAgICAgICdAdHlwZXMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy90eXBlcycpLFxuICAgICAgICAnQGNvbmZpZyc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbmZpZycpLFxuICAgICAgICAnQGFzc2V0cyc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2Fzc2V0cycpXG4gICAgICB9XG4gICAgfSxcbiAgXG4gICAgLy8gQ1NTXHU5MTREXHU3RjZFXG4gICAgY3NzOiB7XG4gICAgICBtb2R1bGVzOiB7XG4gICAgICAgIC8vIENTUyBNb2R1bGVzXHU5MTREXHU3RjZFXG4gICAgICAgIGxvY2Fsc0NvbnZlbnRpb246ICdjYW1lbENhc2UnLFxuICAgICAgICBnZW5lcmF0ZVNjb3BlZE5hbWU6IGlzRGV2IFxuICAgICAgICAgID8gJ1tuYW1lXV9fW2xvY2FsXV9fX1toYXNoOmJhc2U2NDo1XSdcbiAgICAgICAgICA6ICdbaGFzaDpiYXNlNjQ6OF0nXG4gICAgICB9LFxuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBsZXNzOiB7XG4gICAgICAgICAgLy8gXHU1NDJGXHU3NTI4SmF2YVNjcmlwdFx1ODg2OFx1OEZCRVx1NUYwRlx1NjUyRlx1NjMwMVxuICAgICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxuICAgICAgICAgIC8vIFx1NTE2OFx1NUM0MFx1NUJGQ1x1NTE2NVx1NTNEOFx1OTFDRlx1NjU4N1x1NEVGNlxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiAnQGltcG9ydCBcIi4vc3JjL3N0eWxlcy92YXJpYWJsZXMubGVzc1wiOycsXG4gICAgICAgICAgLy8gQW50IERlc2lnblx1NEUzQlx1OTg5OFx1NTNEOFx1OTFDRlxuICAgICAgICAgIG1vZGlmeVZhcnM6IHtcbiAgICAgICAgICAgICdAcHJpbWFyeS1jb2xvcic6ICcjMTg5MGZmJyxcbiAgICAgICAgICAgICdAYm9yZGVyLXJhZGl1cy1iYXNlJzogJzZweCdcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwb3N0Y3NzOiB7XG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAvLyBQb3N0Q1NTXHU2M0QyXHU0RUY2XG4gICAgICAgICAgYXV0b3ByZWZpeGVyKCksXG4gICAgICAgICAgLi4uKGlzUHJvZCA/IFtcbiAgICAgICAgICAgIGNzc25hbm8oe1xuICAgICAgICAgICAgICBwcmVzZXQ6ICdkZWZhdWx0J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdIDogW10pXG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9LFxuICBcbiAgICAvLyBcdTVGMDBcdTUzRDFcdTY3MERcdTUyQTFcdTU2NjhcdTkxNERcdTdGNkVcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIHBvcnQ6IDMwMDAsXG4gICAgICBob3N0OiB0cnVlLFxuICAgICAgb3BlbjogdHJ1ZSxcbiAgICAgIGNvcnM6IHRydWUsXG4gICAgICAvLyBBUElcdTRFRTNcdTc0MDZcdTkxNERcdTdGNkVcbiAgICAgIHByb3h5OiB7XG4gICAgICAgICcvYXBpJzoge1xuICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MCcsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBcdTk4ODRcdTg5QzhcdTY3MERcdTUyQTFcdTU2NjhcdTkxNERcdTdGNkVcbiAgICBwcmV2aWV3OiB7XG4gICAgICBwb3J0OiA0MTczLFxuICAgICAgaG9zdDogdHJ1ZSxcbiAgICAgIG9wZW46IHRydWVcbiAgICB9LFxuICBcbiAgICAvLyBcdTY3ODRcdTVFRkFcdTkxNERcdTdGNkVcbiAgICBidWlsZDoge1xuICAgICAgdGFyZ2V0OiAnZXMyMDE1JyxcbiAgICAgIG91dERpcjogJ2Rpc3QnLFxuICAgICAgYXNzZXRzRGlyOiAnYXNzZXRzJyxcbiAgICAgIHNvdXJjZW1hcDogaXNEZXYgfHwgbW9kZSA9PT0gJ3N0YWdpbmcnLFxuICAgICAgbWluaWZ5OiBpc1Byb2QgPyAndGVyc2VyJyA6IGZhbHNlLFxuICAgICAgXG4gICAgICAvLyBUZXJzZXJcdTkxNERcdTdGNkVcbiAgICAgIHRlcnNlck9wdGlvbnM6IGlzUHJvZCA/IHtcbiAgICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXG4gICAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSxcbiAgICAgICAgICBwdXJlX2Z1bmNzOiBbJ2NvbnNvbGUubG9nJ11cbiAgICAgICAgfSxcbiAgICAgICAgZm9ybWF0OiB7XG4gICAgICAgICAgY29tbWVudHM6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0gOiB1bmRlZmluZWQsXG5cbiAgICAgIC8vIFx1NEVFM1x1NzgwMVx1NTIwNlx1NTI3Mlx1OTE0RFx1N0Y2RVxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBpbnB1dDoge1xuICAgICAgICAgIG1haW46IHJlc29sdmUoX19kaXJuYW1lLCAnaW5kZXguaHRtbCcpXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIC8vIFx1NjI0Qlx1NTJBOFx1NTIwNlx1NTI3MmNodW5rc1xuICAgICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgICAgLy8gXHU3QjJDXHU0RTA5XHU2NUI5XHU1RTkzXG4gICAgICAgICAgICB2ZW5kb3I6IFsncmVhY3QnLCAncmVhY3QtZG9tJ10sXG4gICAgICAgICAgICBhbnRkOiBbJ2FudGQnXSxcbiAgICAgICAgICAgIGNoYXJ0czogWydAYW50LWRlc2lnbi9jaGFydHMnXSxcbiAgICAgICAgICAgIHV0aWxzOiBbJ2xvZGFzaCcsICdkYXlqcycsICdheGlvcyddLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBcdThERUZcdTc1MzFcdTc2RjhcdTUxNzNcbiAgICAgICAgICAgIHJvdXRlcjogWydyZWFjdC1yb3V0ZXItZG9tJ10sXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFx1NzJCNlx1NjAwMVx1N0JBMVx1NzQwNlxuICAgICAgICAgICAgc3RvcmU6IFsnQHJlZHV4anMvdG9vbGtpdCcsICdyZWFjdC1yZWR1eCddXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBcdTY1ODdcdTRFRjZcdTU0N0RcdTU0MERcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogKGNodW5rSW5mbykgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmFjYWRlTW9kdWxlSWQgPSBjaHVua0luZm8uZmFjYWRlTW9kdWxlSWRcbiAgICAgICAgICAgIGlmIChmYWNhZGVNb2R1bGVJZCkge1xuICAgICAgICAgICAgICAvLyBcdTY4MzlcdTYzNkVcdTZBMjFcdTU3NTdcdThERUZcdTVGODRcdTc1MUZcdTYyMTBjaHVua1x1NTQwRFx1NzlGMFxuICAgICAgICAgICAgICBpZiAoZmFjYWRlTW9kdWxlSWQuaW5jbHVkZXMoJ3BhZ2VzLycpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFnZU5hbWUgPSBmYWNhZGVNb2R1bGVJZC5zcGxpdCgncGFnZXMvJylbMV0uc3BsaXQoJy8nKVswXVxuICAgICAgICAgICAgICAgIHJldHVybiBgcGFnZXMvJHtwYWdlTmFtZX0vW25hbWVdLVtoYXNoXS5qc2BcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoZmFjYWRlTW9kdWxlSWQuaW5jbHVkZXMoJ2NvbXBvbmVudHMvJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2NvbXBvbmVudHMvW25hbWVdLVtoYXNoXS5qcydcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICdjaHVua3MvW25hbWVdLVtoYXNoXS5qcydcbiAgICAgICAgICB9LFxuICAgICAgICAgIFxuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnanMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgICAgYXNzZXRGaWxlTmFtZXM6IChhc3NldEluZm8pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSBhc3NldEluZm8ubmFtZS5zcGxpdCgnLicpXG4gICAgICAgICAgICBjb25zdCBleHQgPSBpbmZvW2luZm8ubGVuZ3RoIC0gMV1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gXHU2ODM5XHU2MzZFXHU2NTg3XHU0RUY2XHU3QzdCXHU1NzhCXHU1MjA2XHU3NkVFXHU1RjU1XG4gICAgICAgICAgICBpZiAoL1xcLihtcDR8d2VibXxvZ2d8bXAzfHdhdnxmbGFjfGFhYykkLy50ZXN0KGFzc2V0SW5mby5uYW1lKSkge1xuICAgICAgICAgICAgICByZXR1cm4gYG1lZGlhL1tuYW1lXS1baGFzaF0uJHtleHR9YFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKC9cXC4ocG5nfGpwZT9nfGdpZnxzdmd8d2VicHxhdmlmKSQvLnRlc3QoYXNzZXRJbmZvLm5hbWUpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBgaW1hZ2VzL1tuYW1lXS1baGFzaF0uJHtleHR9YFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKC9cXC4od29mZjI/fGVvdHx0dGZ8b3RmKSQvLnRlc3QoYXNzZXRJbmZvLm5hbWUpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBgZm9udHMvW25hbWVdLVtoYXNoXS4ke2V4dH1gXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYGFzc2V0cy9bbmFtZV0tW2hhc2hdLiR7ZXh0fWBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIC8vIFx1NjAyN1x1ODBGRFx1OTg4NFx1N0I5N1xuICAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTUwMCxcbiAgICAgIFxuICAgICAgLy8gXHU4RDQ0XHU2RTkwXHU1MTg1XHU4MDU0XHU5NjA4XHU1MDNDXG4gICAgICBhc3NldHNJbmxpbmVMaW1pdDogNDA5NixcbiAgICAgIFxuICAgICAgLy8gQ1NTXHU0RUUzXHU3ODAxXHU1MjA2XHU1MjcyXG4gICAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXG4gICAgICBcbiAgICAgIC8vIFx1NzUxRlx1NjIxMG1hbmlmZXN0XG4gICAgICBtYW5pZmVzdDogdHJ1ZSxcbiAgICAgIFxuICAgICAgLy8gXHU2RTA1XHU3QTdBXHU4RjkzXHU1MUZBXHU3NkVFXHU1RjU1XG4gICAgICBlbXB0eU91dERpcjogdHJ1ZVxuICAgIH0sXG5cbiAgICAvLyBcdTRGOURcdThENTZcdTRGMThcdTUzMTZcbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgJ3JlYWN0JyxcbiAgICAgICAgJ3JlYWN0LWRvbScsXG4gICAgICAgICdyZWFjdC1yb3V0ZXItZG9tJyxcbiAgICAgICAgJ2FudGQnLFxuICAgICAgICAnQGFudC1kZXNpZ24vaWNvbnMnLFxuICAgICAgICAnbG9kYXNoJyxcbiAgICAgICAgJ2RheWpzJyxcbiAgICAgICAgJ2F4aW9zJ1xuICAgICAgXVxuICAgIH0sXG5cbiAgICAvLyBcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcbiAgICBkZWZpbmU6IHtcbiAgICAgIF9fREVWX186IGlzRGV2LFxuICAgICAgX19QUk9EX186IGlzUHJvZCxcbiAgICAgIF9fVkVSU0lPTl9fOiBKU09OLnN0cmluZ2lmeShwcm9jZXNzLmVudi5ucG1fcGFja2FnZV92ZXJzaW9uIHx8ICcxLjAuMCcpXG4gICAgfSxcblxuICAgIC8vIEVTQnVpbGRcdTkxNERcdTdGNkVcbiAgICBlc2J1aWxkOiB7XG4gICAgICAvLyBcdTc5RkJcdTk2NjRcdThDMDNcdThCRDVcdTRFRTNcdTc4MDFcbiAgICAgIGRyb3A6IGlzUHJvZCA/IFsnY29uc29sZScsICdkZWJ1Z2dlciddIDogW10sXG4gICAgICAvLyBcdTZDRDVcdTVGOEJcdTZDRThcdTkxQ0FcbiAgICAgIGxlZ2FsQ29tbWVudHM6ICdub25lJ1xuICAgIH1cbiAgfVxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBS0EsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUN4QixPQUFPLGtCQUFrQjtBQUN6QixPQUFPLGFBQWE7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
