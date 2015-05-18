var babel = require('babel-core');
module.exports = require('../localtransform')
(function(str){
  return babel.transform(str).code
});
