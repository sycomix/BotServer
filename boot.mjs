#!/usr/bin/env node

import Fs from 'fs';
import Path from 'path';
import { exec } from 'child_process';
import pjson from './package.json' assert { type: 'json' };

// Displays version of Node JS being used at runtime and others attributes.

console.log(``);
console.log(``);
console.log(` █████  █████ ██    █ █████ █████   ████  ██      ████   █████ █████  ███ ®  `);
console.log(`██      █     ███   █ █     ██  ██ ██  ██ ██      ██  █ ██   ██  █   █       `);
console.log(`██  ███ ████  █ ██  █ ████  █████  ██████ ██      ████   █   █   █    ██     `);
console.log(`██   ██ █     █  ██ █ █     ██  ██ ██  ██ ██      ██  █ ██   ██  █      █    `);
console.log(` █████  █████ █   ███ █████ ██  ██ ██  ██ ██████  ████   █████   █   ███  3.0`);
process.stdout.write(`   botserver@${pjson.version}, botlib@${pjson.dependencies.botlib}, botbuilder@${pjson.dependencies.botbuilder}, node@${process.version.replace('v', '')}, ${process.platform} ${process.arch} `);

var now = () => {
  return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + ' UTC';
};
var __dirname = process.env.PWD || process.cwd();
try {
  var run = () => {
    import('./dist/src/app.js').then((gb)=> {
      console.log(`\n`);
      gb.GBServer.run()
    });
  };
  var processDist = () => {
    if (!Fs.existsSync('dist')) {
      console.log(`\n`);
      console.log(`Generall Bots: Compiling...`);
      exec(Path.join(__dirname, 'node_modules/.bin/tsc'), (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }
        run();
      });
    } else {
      run();
    }
  };

  // Installing modules if it has not been done yet.

  if (!Fs.existsSync('node_modules')) {
    console.log(`\n`);
    console.log(`Generall Bots: Installing modules for the first time, please wait...`);
    exec('npm install', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      processDist();
    });
  } else {
    processDist();
  }
} catch (e) {
  console.log(e);
}
