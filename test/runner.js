var render = require('./render');
var runner = function(testinputs, evaluate){
  var test = new Promise(function(resolve){resolve()});
  testinputs.forEach(function(input){
    test = test.then(function(){
      return evaluate(input)
        .then(function(result){
          render(result[0], result[1]);
          console.log("in  > " + result[0]);
          console.log("out < " + result[1]);
        }).catch(function(error){
          console.log(error.toString());
        });
    });
  });
}
module.exports = runner;
