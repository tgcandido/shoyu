const terminal = require('node-cmd')
const split = require('split-lines')
const logger = require('./logger')

function getInstalledPackages() {
  return getLsResult()
    .then(splitLsContents)
    .then(extractPackagesNames)
    .catch((err) => logger.error(err))
}

function getLsResult() {
  let cmd = 'npm ls --depth=0'

  return new Promise((resolve, reject) => {
    terminal.get(cmd, (data) => {
      resolve(data)
    })
  })
}

function splitLsContents(lsResult) {
  return new Promise((resolve) => {
    let lsResultArr = split(lsResult)

    resolve(
      lsResultArr.slice(1,lsResultArr.length)
    )
  })
}

//lsLine example: ├── args@2.4.1
function extractPackagesNames(lsResultArr){
    let packagesNames = []

    for (let lsLine of lsResultArr){
      if (lsLine){
        lsLine = lsLine.slice(4, lsLine.length)
        let parsedLine = /(\w+-?\w+)/.exec(lsLine)[0]
        packagesNames.push(parsedLine)
      }
    }

    return packagesNames;
}

function installPackages(pkgs){
  let cmd = `npm i --save ${pkgs.join(' ')}`

  return new Promise((resolve, reject)=>{
    terminal.get(cmd, (data) =>{
      resolve(data)
    })
  })
}

module.exports = {
  getInstalledPackages: getInstalledPackages,
  installPackages: installPackages,
}
