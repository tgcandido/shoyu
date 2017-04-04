const terminal = require('node-cmd')

function getInstalledPackages() {
  let cmd = 'npm ls --depth=0'

  return new Promise((resolve, reject) => {
    terminal.get(cmd, (data) => {
      resolve(data)
    })
  })
}

function installPackages(pkgs) {
  let cmd = `npm i --save ${pkgs.join(' ')}`

  return new Promise((resolve, reject) => {
    terminal.get(cmd, (data) => {
      resolve(data)
    })
  })
}

function searchPackages(packages) {
  let promises = []

  for (let pkg of packages) {
    let cmd = `npm search ${pkg} --json --no-description `

    promises.push(new Promise((resolve, reject) => {
      terminal.get(cmd, (data) => {
        let pkgData = {
          name : pkg,
          npmRepositoryPackages : JSON.parse(data)
        }
        resolve(pkgData)
      })
    }))
  }

  return Promise.all(promises)
}

module.exports = {
  searchPackages: searchPackages,
  installPackages: installPackages,
  getInstalledPackages: getInstalledPackages
}