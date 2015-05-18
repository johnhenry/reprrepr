var evaluate = function(str, evalfunc, environment, inputHistory, outputHistory){
  var input = str;
  var output;
  try{
    output = evalfunc(input, environment);
  }catch(error){
    output = error.toString();
  }
  inputHistory.push(input);
  outputHistory.push(output);
  return Promise.resolve({
    inputs:inputHistory,
    outputs:outputHistory
  });
};

module.exports = function(evalfunc, environment, inputHistory, outputHistory){
  evalfunc = evalfunc || eval;
  environment = environment || {};
  inputHistory = inputHistory || [];
  outputHistory = outputHistory || [];
  return function(input){
    return evaluate(input, evalfunc, environment, inputHistory, outputHistory);
  };
}
