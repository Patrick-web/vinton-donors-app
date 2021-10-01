module.exports = {
  devServer: {
    disableHostCheck: true
  },
  transpileDependencies: [
    'vuetify'
  ],

  publicPath: '',

  pluginOptions: {
    cordovaPath: 'src-cordova'
  }
}

