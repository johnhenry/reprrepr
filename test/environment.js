var history = require('./history');
var lispyscript = require('lispyscript');
var lispyscriptEval = function(string){
  return eval(lispyscript._compile(string));
}
//Environment
module.exports = {
  $input : function(index){
        return history[history.length - 1 - (2 * index + 1)];
      },
  $output : function(index){
        return history[history.length - 1 - ( 2 * index)];
      },
  lispyscriptEval : lispyscriptEval,
  Math : Math
};
