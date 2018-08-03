#!/usr/bin/env node

const { stdout: tty } = require('ttys');
const { generate } = require('./lib');
const { url, selectors, indentation } = require('./config');

// Actually generate colors
generate(url, selectors, tty).then(
  // Success
  (colors) => {
    const json = JSON.stringify(colors, null, indentation);
    process.stdout.write(`${json}\n`);
  },
  // Error
  (error) => {
    process.stderr.write(`Could not generate colors: ${error.message || error}\n`);
    if (error.stack) {
      process.stderr.write(`${error.stack}\n`);
    }
    process.exit(1);
  },
);
