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

A REPL for Multiple Languages

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
