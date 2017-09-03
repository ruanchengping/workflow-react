const paths = require('react-scripts/config/paths');

/* config-overrides.js */
module.exports = function override(config, env) {

  const baleLoader = config.module.rules
    // .find(rule => rule.loader && rule.loader.endsWith('/babel-loader/lib/index.js'));
    .find(rule => rule.loader && rule.loader.indexOf('babel-loader')>-1);
  //baleLoader.options.babelrc = true;
  baleLoader.options.presets.push('stage-3');
  baleLoader.options.plugins = [
    "syntax-dynamic-import",
    'transform-decorators-legacy',
    "transform-runtime",
  ];

  return config;
};
