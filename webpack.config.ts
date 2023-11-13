import { container } from 'webpack';
const deps = require('./package.json').dependencies;

module.exports = {
  output: {
    publicPath: 'http://localhost:3002/',
    uniqueName: 'mdmfprofile',
    scriptType: 'text/javascript',
  },
  optimization: {
    runtimeChunk: false,
  },
  devServer: {
    port: 3002,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: true,
  },
  plugins: [
    new container.ModuleFederationPlugin({
      name: 'app_angular',
      filename: 'remoteEntry.js',
      remotes: {
        app_react: `app_react@http://localhost:3001/remoteEntry.js`,
      },
      exposes: {
        './page': './src/loadApp.ts'
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom/client': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
  ],
};
