var evaluate = function(input, evalfunc, environment){
  var output;
  try{
    output = evalfunc(input, environment);
  }catch(error){
    output = error.toString();
  }
  return Promise.resolve([input, output]);
};

module.exports = function(evalfunc, environment){
  return function(input){
    return evaluate(input, evalfunc || eval, environment || {});
  };
}
