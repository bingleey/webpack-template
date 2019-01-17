const webpack = require('webpack'),
	  path = require('path'),
	  htmlWebpackPlugin = require('html-webpack-plugin'),
    extractTextWebpackPlugin = require('extract-text-webpack-plugin'),
    app = require('express'),
    mock = require('./mock');
let pages = require('./pages.json');

let webpackConfig = {
	entry: {
    'common': path.resolve(__dirname, 'src/assets/js/common.js'),
    'index': path.resolve(__dirname, 'src/assets/js/index.js')
  },
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'assets/[name].[hash:8].bundle.js',
		// publicPath: '/'
	},
	module: {
		rules: [
			{
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: extractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        }),
      },
      {
      	test: /\.(woff|woff2|svg|eot|ttf)$/,
        exclude: /node_modules/,
        use: ['file-loader'],
      },
      {
      	test: /\.(png|jpg|jpeg|gif)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'assets/images/[hash:8].[ext]',
          }
        }]
      },
      {
        test: /\.ejs$/,
        exclude: /node_modules/,
        use: [{
          loader: 'ejs-loader'
        }]
      },
      {
        test: require.resolve('jquery'),
        use: [
	        {
	          loader: 'expose-loader',
	          options: 'jQuery'
	        }, 
	        {
            loader: 'expose-loader',
            options: '$'
	        }
        ]
	    }
		]
	},
	plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
    }),
    new extractTextWebpackPlugin({
      filename: 'assets/css/[name].[hash:8].css',
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
  	contentBase: "./dist/",
    port: 8081,
    hot: true,
    compress: true,
    before (app) {
      mock(app);
    }
    // openPage: 'dist/pages/home.html'
    /*historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/pages/home.html' }
      ]
    }*/
  },
}

pages.forEach(function (page) {
  if (page.isRoot != 'false') {
    webpackConfig.plugins.push(
      new htmlWebpackPlugin({
        pageName: page.name,
        template: path.resolve(__dirname, 'src/layout.ejs'),
        chunks: ['common', page.name],
        // filename: `pages/${page.name}.html`,
        filename: (page.name == 'index') ? 'index.html' : `pages/${page.name}.html`,
        pages: pages
      })
    )
  }
})

module.exports = webpackConfig;