//Run Test
console.log("--Javascript--");
require('./runner')([
  'Math.sin(1+1)',
  '$output(0) + 1;',
  '$input(0);',
  'var a = 2;',
  'a /= 2;',
  'eval(\'Math.atanh(-1);\');',
  'Math.PI',
  'Math.E'
],
require('./proxy')(
  require('localeval'),
  require('./scope')
));
