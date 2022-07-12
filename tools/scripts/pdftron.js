#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const fs = require('fs-extra')

yargs(hideBin(process.argv))
  .command(
    'static',
    'copy static files to public folder',
    yargs => {},
    async () => {
      try {
        await fs.copy('./node_modules/@pdftron/webviewer/public', './apps/server-monolith/public/pdftron')
      } catch (err) {
        console.error(err)
      }
    }
  )
  .parse()