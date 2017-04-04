const terminal = require('node-cmd')
const split = require('split-lines')
const logger = require('./logger')


function parseInstalledPackagesStr(installedPackagesStr) {
  return new Promise((resolve) => {
    let pgks = split(installedPackagesStr)

    resolve(
      pgks.slice(1,pgks.length)
    )
  })
}

//lsLine example: ├── args@2.4.1
function parsePackagesNames(installedPackages){
    let packagesNames = []

    for (let package of installedPackages){
      if (package){
        package = package.slice(4, package.length)
        let parsedLine = /(\w+-?\w+)/.exec(package)[0]
        packagesNames.push(parsedLine)
      }
    }

    return packagesNames;
}

module.exports = {
  getInstalledPackages : parseInstalledPackagesStr,
  parsePackagesNames: parsePackagesNames,
}
