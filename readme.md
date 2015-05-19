###READ
###EVALUATE
###PRINT
###REPEAT
###READ
###EVALUATE
###PRINT
###REPEAT
###READ
###EVALUATE
###PRINT
###REPEAT
###READ
###EVALUATE
###PRINT
###REPEAT
###...

#Read Evaluate Print Repeat

A Javascript REPL

##Features

###Multiple Languages
 reprrepr currently supports the folowing languages through use of the __--language__ flag:
  - Javascript (Default)
  - [Lisypscript](http://lispyscript.com/)
  - [ECMASscript 6 (via babel.js)](https://babeljs.io/)

###Isolated Environment
  reprrepr executes in an isolated environment with most top level objects stripped out. You may define your own custom environment using the __--environment__ flag (see below for more);

###Custom Rendering
  reprrepr needn't simply render to the console. Define your own custom rendere wit the __--render__ flag (see below for more);

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
