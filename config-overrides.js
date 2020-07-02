const CopyPlugin = require('copy-webpack-plugin');
module.exports = function override(config, env) {
    //do stuff with the webpack config...
    config.plugins.push(new CopyPlugin({
        patterns: [
          { from: __dirname + '/src/json', to: 'json' },
        ],
      }));
    
    return config;
}