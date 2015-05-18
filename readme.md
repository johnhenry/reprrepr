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

#Read Evaluate Print Repeat

A Javascript REPL

##Features

###Multiple Languages
 reprrepr currently supports the folowing languages:
  - Javascript (Default)
  - [Lisypscript](http://lispyscript.com/)
  - [ECMASscript 6 (via babel.js)](https://babeljs.io/)

###Isolated Environment
  reprrepr executes in an isolated environment with most top level objects stripped out. You may define your own custom environment using the --environment flag (see below for more);

###Custom Rendering
  reprrepr needn't simply render to the console. Define your own custom rendere wit the --render flag (see below for more);

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
###Evaluate Lispyscript inline
```bash
repr --language lispyscript --eval "(+ 1 1)"
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
  environment:{},/*Execution environment object*/
  inputHistory:[],/*Array for inputs*/
  outputHistory:[]/*Array for outputs*/
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

###Flags can be mixed and matched (where it makes sense)
```bash
repr --language es6 \
--set-environment environment.js\
--no-verbose \
--file input.es6.js > output.js
```
Note: render and environment modules must be written in Javascript, even if the REPL's language is set to something different

```js
module.exports = function(inputHistory, outputHistory){
  return outputHistory[outputHistory.length - 1];
};

```

###Pipe text to repr using the --eval flag
```bash
echo '(+ 1 1)' | repr --language lispyscript --eval
```
Note: render and environment modules must be written in Javascript, even if the REPL's language is set to something different

```js
module.exports = function(inputHistory, outputHistory){
  return outputHistory[outputHistory.length - 1];
};

```
