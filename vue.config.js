const path = require('path')

module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Teeter Totter'
        return args
      })
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@base': path.resolve(__dirname, '/src/components/base')
      },
      extensions: ['.js', '.vue', '.json']
    }
  }
}
