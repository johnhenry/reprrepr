var evaluate = function(input, evalfunc, scope){
  var output;
  try{
    output = evalfunc(input, scope);
  }catch(error){
    output = error.toString();
  }
  return Promise.resolve([input, output]);
};

module.exports = function(evalfunc, scope){
  return function(input){
    return evaluate(input, evalfunc || eval, scope || {});
  };
}
