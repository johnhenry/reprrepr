var localeval = require('localeval');
module.exports = function(transform){
  return function(args){
    args = Array.prototype.slice.call(arguments);
    args[0] = transform(args[0]);
    return localeval.apply(this, args);
  };
}
