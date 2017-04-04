const fileParser = require('./file_parser')
const logger = require('./logger')
const unique = require('array-unique')

function getSrcDependencies() {
  return fileParser.readAllfiles()
    .then(fileParser.splitFileContents)
    .then(fileParser.parsePackagesNames)
    .then(filterNodeApiPackages)
    .catch((err) => logger.error(err))
}

function filterNodeApiPackages(packages) {
  let nodeApi = [
    'assert', 'child_process', 'cluster', 'http', 'https', 'os',
    'crypto', 'dns', 'domain', 'events', 'fs', 'net', 'path',
    'punycode', 'querystring', 'readline', 'repl', 'stream',
    'string_decoder', 'tls', 'tty', 'dgram', 'url', 'util',
    'v8', 'vm', 'lib'
  ]

  packages = packages.filter((package) => {
    return nodeApi.indexOf(package) === -1
  })
  return unique(packages)
}

module.exports = {
    getSrcDependencies : getSrcDependencies
}