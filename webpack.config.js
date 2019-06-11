module.exports = (webpackConfig, env) => {
    // 别名配置
    webpackConfig.resolve.alias = {
      '@': `${__dirname}/src`,
      '@questions': `${__dirname}/src/routes/Questions`
    }
    return webpackConfig
  }