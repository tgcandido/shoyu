const fs = require('fs')
const split = require('split-lines')
const find = require('find')
const unique = require('array-unique')
const logger = require('./logger')

function getPackagesNames() {
  return readAllfiles()
    .then(splitFileContents)
    .then(extractPackagesNames)
    .then(filterPackagesNames)
    .catch((err) => logger.error(err))
}

function readAllfiles() {
  return new Promise((resolve, reject) => {
    find.file(/\.js$/, '.', (files) => {
      if (files.length > 0) {
        let projectFiles = files.filter(
          (file) => file.search('node_modules') === -1)
        resolve(projectFiles)
      } else {
        reject(filse)
      }
    })
  })
}

function filterPackagesNames(packages) {
  let nodeApi = [
    'assert', 'child_process', 'cluster', 'http', 'https', 'os',
    'crypto', 'dns', 'domain', 'events', 'fs', 'net', 'path',
    'punycode', 'querystring', 'readline', 'repl', 'stream',
    'string_decoder', 'tls', 'tty', 'dgram', 'url', 'util',
    'v8', 'vm', 'lib'
  ]

  packages = packages.filter((package)=>{
    return nodeApi.indexOf(package) === -1
  })
  return unique(packages)
}

function extractPackagesNames(files) {
  let packageNameRegex = /'([^']+)'/
  let packages = []

  for (let file of files) {
    for (let line of file.content) {
      if (line.search('require\\(') !== -1) {
        let packageName = line.match(packageNameRegex)[1]
        if (packageNameIsValid(packageName)) {
          packages.push(packageName)
        }
      }
    }
  }

  return new Promise((resolve)=>{
    resolve(packages)
  })
}

function packageNameIsValid(packageName) {
  return !packageName.startsWith('.') &&
    !packageName.startsWith('/') &&
    !packageName.startsWith('\\')
}

function splitFileContents(files) {
  var fileContents = []

  for (let file of files) {
    let buf = fs.readFileSync(file, 'utf-8')
    let lines = split(buf)
    fileContents.push({
      name: file,
      content: lines
    })
  }

  return new Promise((resolve) => {
    resolve(fileContents)
  })
}

module.exports = {
  getPackagesNames: getPackagesNames
}
