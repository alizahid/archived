#!/usr/bin/env node

import yargs from 'yargs'

import Fumblr from './src/lib/fumblr'

const args = yargs
  .usage('$0 [args]')
  .option('name', {
    default: 'alizahid0',
    describe: 'Blog name',
    type: 'string'
  })
  .option('following', {
    default: false,
    describe: 'Download all blogs you are following',
    type: 'boolean'
  })
  .help('help').argv

Fumblr.fetch(args)
