###READ
###EVALUATE
###PRINT
###REPEAT
###READ
###EVALUATE
###PRINT
###REPEAT

#Read Evaluate Print Repeat

A Javascript REPL with a customizable environment

##Features

###Multiple Languages
 reprrepr currently supports the folowing languages through use of the __--language__ flag:
  - Javascript (Default)
  - [Lisypscript](http://lispyscript.com/)
  - [ECMASscript 6 (via babel.js)](https://babeljs.io/)

###Isolated Environment
  __reprrepr__ executes in an isolated environment with most top level objects stripped out. You may define your own custom environment using the __--set-environment__ flag (see below for more).

###Custom Rendering
  __reprrepr__ needn't simply render to the console. Define your own custom render function with the __--set-render__ flag (see below for more).

###Custom Evaluation
  __reprrepr__ isn't limited to simply evaluating the built in languages. Define your own evaluator using the __--set-evaluator__ flag (see below for more).

###Web Socket REPL
  __reprrepr__ can host a repl using the __--host__ flag (see below for more).

##Installation

```bash
npm install -g reprrepr
```

##Usage

###View Help
```bash
repr --help
```

###Open a Javascript REPL
```bash
repr
```

###Open a Lispyscript REPL
```bash
repr --language lispyscript
```

###View available languages
```bash
repr --languages
```

###Evaluate Javascript inline
```bash
repr --eval "1 + 1;"

```
###Evaluate piped Lispyscript using an empty --eval flag
```bash
echo "(+ 1 1)" | repr --language lispyscript --eval
```

###Evaluate A Javascript file
```bash
repr --file javascript.js
```

###Evaluate A Lispyscript file
```bash
repr --file --language lispyscript lispyscript.lsjs
```

###Open a REPL with specified environment module
```bash
repr --set-environment environment.js
```
The environment module should export an object similar to the following:

```js
module.exports = {
  Math : Math
}
```

###Open a REPL with specified render module
```bash
repr --set-render render.js
```
The render module should export an object similar to the following:

```js
module.exports = function(inputHistory, outputHistory){
  return outputHistory[outputHistory.length - 1];
};
```

###Set the function used to evaluate
```bash
repr --set-evaluator evaluator.js
```
The evaluator module should export a function similar to the following:

```js
module.exports = function(input){
  return Promise.resolve([input, eval(input)]);
}
```
It should take an input and return a promise resolved an array of length 2;
  the first value must be the original input,
  the second value must be the evaluated input.

Note: Setting the evaluator will override the language settings
but not the renderer settings.

###Host a server at 127.0.0.1:8080
```bash
repr --host 8080
```
Multiple parties can connect to this server and send input over a socket.
Output will be distributed to all connected parties.


###Flags can be mixed and matched (where it makes sense)
```bash
repr --language es6 \
--set-environment environment.js\
--no-verbose \
--file input.es6.js > output.js
```
Note: render and environment modules must be written in Javascript, even if the REPL's language is set to something different

##.reprrc
You can define a __.reprrc__ file with pre-defined settings.

```json
{
  "verbose"     : true,
  "render"      : "render.js",
  "language"    : "lispyscript",
  "environment" : "environment.js",
  "evaluator"   : "evaluator.js",
  "host"        : 8080
}
```
Note: the __.reprrc__ is a json file.

The following properties are available in the __.reprrc__ file:

  - verbose -- similar to  __--verbose__ flag
  - render -- similar to  __--set-render__ flag
  - language -- similar to  __--language__ flag
  - environment -- similar to  __--set-enviornmet__ flag
  - evaluator -- similar to  __--set-evaluator__ flag
  - host -- similar to  __--host__ flag
  - eval -- similar to  __--eval__ flag
  - execute -- code to execute before starting repl

##Advanced Usage Examples

###Access history from within your repl

 - 1 - Set up a module that exports a history array.

####history.js
```javascript
var history = [];
module.exports = history;
```

 - 2 - Create an renderer that adds inputs to the history array.

####render.js
```javascript
var history = require('./history');
var render = function(input, output){
  history.push(input);
  history.push(output);
  return output;
};
module.exports = render;
```

 - 3 - Create an environment with functions to access history

####environment.js

```javascript
var history = require('./history');
var environment = {
  input:function(index){
    return history[2 * index];
  },
  output:function(index){
    return history[2 * index + 1];
  },
  history:history
}
```
 - 4 - Run with custom Flags

```
repl --set-environment environment.js --set-render render.js
> 1 + 1
2
> 3 + 2
5
> output(0);
2
> input(1)
3 + 2
> history[4]
output(0);
```
Note : Be careful when your repl leaks into its outer environment like this.
It may lead to unintended side effects.

 - 5 - You could also set these in a __.reprrc__ file like so:

####.npmrc

```json
{
  "environment" : "environment.js",
  "render"      : "render.js"
}
```

###READ
###EVALUATE
###PRINT
###REPEAT
###...
