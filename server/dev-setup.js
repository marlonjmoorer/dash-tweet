module.exports=(app)=>{
    const webpackConfig = require('../webpack.dev.config');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
  
    const compiler= webpack(webpackConfig)
  
    app.use(webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: {colors: true}
    }))
    app.use(webpackHotMiddleware(compiler, {
      log: console.log
    }))
    app.use(require('cors')())  
}