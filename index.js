const args = require('args')
const installer = require('./lib/installer')

args.command('install', 'parse and install dependencies', installer)

const flags = args.parse(process.argv)
