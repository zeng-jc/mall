module.exports = {
  configureWebpack: {
    resolve: {
      // extensions:[],
      alias: {
        //'@': 'src',在脚手架中已经默认配置，但是被隐藏了
        'common': '@/common',
        'assets': '@/assets',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}