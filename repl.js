#!/usr/bin/env node
var _package = require('./package.json')
var argv = require('yargs')
.usage('Usage: $0 [options]')
.describe('version',  'display $0 version')
.alias('v', 'version')
.boolean('version')
.describe('verbose', 'display verbose output')
.boolean('verbose')
.default('verbose', true)
.describe('eval', 'evalutate a give string')
.example('$0 --eval "1+1" ', 'evaluate a given string')
.alias('e', 'eval')
.describe('file', 'evalutate a give file')
.example('$0 --file foo.js ', 'evaluate a given file')
.alias('f', 'file')
.describe('set-environment', 'set environment module')
.example('$0 --set-environment environment.js ', 'set environment to environment.js')
.describe('set-renderer', 'set render module')
.example('$0 --set-render render.js', 'set render to render.js')
.describe('language', 'set language')
.example('$0 --language lispyscript ', 'set language to lispyscript')
.alias('l', 'language')
.describe('languages', 'view available languages')
.help('h')
.alias('h', 'help')
.epilog('copyright 2015')
.argv;
var fs = require('fs');
//--help flag
if(argv.help){
  return console.log('help');
};
//Create evaluator
var environment;
try{
  environment = require(argv['set-environment']);
  if(argv.verbose) console.log('loaded local environment module' + args['set-environment']);
}catch(error){
  environment = require('./environment');
}
var render;
try{
  render = require(argv['set-render']);
  if(argv.verbose) console.log('loaded local render module:' + args['set-render']);
}catch(error){
  render = require('./render');
}

var language = argv.language;
var evaluatorPath =
  fs.existsSync(__dirname + '/languages/' + language + ".js") ?
  './languages/' + language :
  language = 'localeval';

var evaluator = require('./evaluator')(
  environment.environment,
  require(evaluatorPath),
  environment.inputHistory,
  environment.outputHistory
);
//--eval flag
if(argv.version){
  return console.log(_package.version);
};
//--eval flag
if(argv.eval){
  return evaluator.evaluate(argv.eval)
    .then(function(history){
      console.log(render(
        environment.inputHistory,
        environment.outputHistory));
        readline.prompt(true);
    })
};
//--file flag
if(argv.file){
  return evaluator.evaluate(fs.readFileSync(argv.file))
    .then(function(history){
      console.log(render(
        environment.inputHistory,
        environment.outputHistory));
        readline.prompt(true);
    })
};
//--languages flag
if(argv.languages){
  console.log('Languages');
  fs.readdirSync(__dirname + "/languages")
  .map(function(language){
    return language.substring(0, language.length - 3)
  })
  .forEach(function(language){
    console.log('\t',language);
  });
  return;
};

//Create REPL
var readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});
readline.setPrompt(argv.propmt || ((language === 'localeval'? '' : language) + '>') );
readline.on('line', function(line){
  evaluator.evaluate(line)
    .then(function(history){
      console.log(render(
        environment.inputHistory,
        environment.outputHistory));
        readline.prompt(true);
    })
    .catch(function(error){
        console.log(error.toString());
        readline.prompt(true);
    });
});

readline.prompt(true);
