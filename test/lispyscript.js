//Run Test
console.log("--Lispyscript--");
require('./runner')([
  '(Math.sin (+ 1 1))',
  '(+ ($output 0) 1)',
  '($input 0)',
  '(var a 2)',
  '(set a (/ a 2))',
  '(lispyscriptEval \'(Math.atanh -1)\')',//Lispyscript's eval is javascript's eval?...
  '(.PI Math)',
  '(.E Math)'
],
require('./evaluator')(
  require('../languages/lispyscript'),
  require('./environment')
));
