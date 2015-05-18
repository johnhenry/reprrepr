var evaluate = function(str, environment, evalfunc, inputHistory, outputHistory){
  return new Promise(function(resolve, reject){
    var input = str;
    var output;
    try{
      output = evalfunc(input, environment);
    }catch(error){
      output = error.toString();
    }
    inputHistory.push(input);
    outputHistory.push(output);
    return resolve({
      inputs:inputHistory,
      outputs:outputHistory
    });
  });
};

module.exports = function(environment, evalfunc, inputHistory, outputHistory){
  environment = environment || {};
  evalfunc = evalfunc || eval;
  inputHistory = inputHistory || [];
  outputHistory = outputHistory || [];
  return {
    evaluate : function(input){
      return evaluate(input, environment, evalfunc, inputHistory, outputHistory);
    }
  };
}
