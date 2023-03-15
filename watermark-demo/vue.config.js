module.exports = {
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        assets: "assets",
        components: "components",
      }
    }
  }
}
