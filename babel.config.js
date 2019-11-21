module.exports = {
  presets: [
    ['@babel/env'],
    ['minify', {
      'keepFnName': true
    }]
  ]
};
