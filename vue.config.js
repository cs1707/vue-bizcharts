module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.externals = {
        '@antv/g2': {
          root: 'G2',
          commonjs: '@antv/g2',
          commonjs2: '@antv/g2',
          amd: '@antv/g2'
        },
        vue: {
          root: 'Vue',
          commonjs: 'vue',
          commonjs2: 'vue',
          amd: 'vue'
        }
      }
    }
  }
}
