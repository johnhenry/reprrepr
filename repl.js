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
.example('$0 --eval \'1+1\' ', 'evaluate a given string')
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
process.on('SIGINT', function () {
  if(argv.verbose) console.log('Exiting');
  process.exit(0);
});
var fs = require('fs');
//--help flag
if(argv.help){
  return console.log('help');
};

//Load renderer
var render;
try{
  render = require(argv['set-render']);
  if(argv.verbose) console.log('loaded local render module:' + args['set-render']);
}catch(error){
  render = function(input, output){
    return output;
  };
}
//Load environment
var evaluate;
var language;
try{
  evalutate = require(argv['set-evaluator']);
  if(argv.verbose) console.log('loaded local evaluator' + args['set-evaluator']);
  language = '?';
}catch(e){
  //Load environment
  language = argv.language;
  var environment;
  try{
    environment = require(argv['set-environment']);
    if(argv.verbose) console.log('loaded local environment module' + args['set-environment']);
  }catch(error){
    environment = {};
  }
  //Create evaluate function
  var language = argv.language;
  var evaluator =
    fs.existsSync(__dirname + '/languages/' + language + '.js') ?
    './languages/' + language :
    language = 'localeval';
  var evaluate = require('./evaluator')(
    require(evaluator),
    environment
  );
}
language = language === 'localeval' ? '' : language;
//--version flag
if(argv.version){
  return console.log(_package.version);
};
//--eval flag
if(argv.eval !== undefined){
  if(argv.eval === true){
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    return process.stdin.on('data', function(data){
      return evaluate(data)
        .then(function(history){
          console.log(render(
            environment.inputHistory,
            environment.outputHistory));
            readline.prompt(true);
        })
    });
  }else{
    if(argv.verbose) console.log('Evaluating String: ' + argv.eval);
    return evaluate(argv.eval)
      .then(function(history){
        console.log(render(
          environment.inputHistory,
          environment.outputHistory));
          readline.prompt(true);
      })
  }
};
//--file flag
if(argv.file){
  if(argv.verbose) console.log('Evaluating File: ' + argv.file);
  return evaluate(fs.readFileSync(argv.file))
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
  fs.readdirSync(__dirname + '/languages')
  .map(function(language){
    return language.substring(0, language.length - 3)
  })
  .forEach(function(language){
    console.log('\t',language);
  });
  return;
};
//--host flag
if(argv.host){
  var port = argv.host === true? '8080' : argv.host;
  var hat = require('hat');
  var sockets = new Set();
  var express = require('express');
  var app = express();
  app.use(require('serve-index')(process.cwd()));
  app.use(express.static(process.cwd()));
  var busy;
  var socketFunction = function(socket){
    var id = hat(32,16);
    socket.send('id: ' + id + (language? ', language: ' + language : ''));
    sockets.add(socket);
    if(argv.verbose) console.log('sockets connected: ' + sockets.size);
    socket.on('message', function(input){
      if(busy){
        socket.send('busy');
        return;
      }
      busy = true;

      evaluate(input)
        .then(function(result){
          busy = false;
          if(argv.verbose){
            console.log(language +'['+id+']>'+result[0]);
            console.log(result[1]);
          };
          sockets.forEach(function(socket){
            socket.send(JSON.stringify(result.concat(id)));
          });
        })
        .catch(function(error){
          socket.send(error.toString());
        });
      });
    socket.on('error', function(error){
      if(argv.verbose) console.log('socket error: ' + error);
      socket.close();
      sockets.delete(socket);
      if(argv.verbose) console.log('sockets connected: ' + sockets.size);
    });
    socket.on('close', function(reason){
      if(argv.verbose) console.log('socket closed: ' + reason);
      sockets.delete(socket);
      if(argv.verbose) console.log('sockets connected: ' + sockets.size);
    });
  }
  var server = app.listen(port, function(){
    if(argv.verbose) console.log('listening on port: ' + port);
    var ws = require('ws').Server;
    var wss = new ws({server:server});
    wss.on('connection', socketFunction);
  })
  return;
}

//Create REPL
var readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});
readline.setPrompt(argv.propmt || (language + '>') );
readline.on('line', function(line){
  evaluate(line)
    .then(function(result){
      console.log(render(result[0], result[1]));
        readline.prompt(true);
    })
    .catch(function(error){
        console.log(error.toString());
        readline.prompt(true);
    });
});
readline.prompt(true);
