module.exports = {
    chainWebpack: (config) => {
      config.optimization.splitChunks({
        cacheGroups: {
          vendor: {
            name: 'chunk-vendor',
            test: /[\\/]node_modules[\\/](vxe-table|xe-utils|@tencent\/beacon-web-sdk|@ctrl|dayjs|@popperjs|normalize-wheel-es|resize-observer-polyfill|jsonp|core-js|lodash|@babel\/runtime|buffer|base64-js|ieee754|async-validator|url|node-libs-browser|querystring-es3|regenerator-runtime)[\\/]/,
            reuseExistingChunk: true,
            chunks: 'async',
          },
          element: {
            name: 'chunk-element',
            test: /[\\/]node_modules[\\/](element-plus)[\\/]/,
            reuseExistingChunk: true,
            chunks: 'async',
          },
          video: {
            name: 'chunk-video',
            test: /[\\/]node_modules[\\/](video.js|@videojs|aes-decrypter|m3u8-parser|mpd-parser|videojs-font|videojs-vtt.js|safe-json-parse|url-toolkit|global|keycode|mux.js|@xmldom)[\\/]/,
            reuseExistingChunk: true,
            chunks: 'all',
          },
          xlsx: {
            name: 'chunk-xlsx',
            test: /[\\/]node_modules[\\/]xlsx[\\/]/,
            reuseExistingChunk: true,
            chunks: 'all',
          },
          echarts: {
            name: 'chunk-echarts',
            test: /[\\/]node_modules[\\/](echarts|zrender)[\\/]/,
            reuseExistingChunk: true,
            chunks: 'all',
          },
        },
      });
    },
  };