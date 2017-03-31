const fs = require('fs')
const split = require('split-lines')
const find = require('find')
const unique = require('array-unique')

function getPackagesNames () {
  return readAllfiles()
    .then(splitFileContents)
    .then(getPackages)
    .catch((err) => console.log(err))
}

function readAllfiles () {
  return new Promise((resolve, reject) => {
    find.file(/\.js$/, '.', (files) => {
      if (files.length > 0){
        let projectFiles = files.filter(
          (file) => file.search('node_modules') ===-1)

        resolve(projectFiles)
        
      } else {
        reject(filse)
      }      
    })
  })
}

function getPackages (files) {
  let packageNameRegex = /'([^']+)'/
  let packages = []

  for (let file of files) {
    for (let line of file.content) {
      if (line.search('require\\(') !== -1) {
        let packageName = line.match(packageNameRegex)[1]
        if (packageNameIsValid(packageName)){
          packages.push(packageName)
        }
      }
    }
  }

  return unique(packages)
}

function packageNameIsValid(packageName){
  return !packageName.startsWith('.') && 
          !packageName.startsWith('/') &&
          !packageName.startsWith('\\')
}

function splitFileContents (files) {
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
