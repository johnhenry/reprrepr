var history = require('./history');
var render = function(input, output){
  history.push(input);
  history.push(output);
  return output;
};
module.exports = render;
