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
