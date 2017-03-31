const terminal = require('node-cmd')
const split = require('split-lines')

function getInstalledPackages () {
  var cmd = 'npm ls --depth=0'

  return new Promise((resolve, reject) => {
    //TODO tokenize and return array with packages names
    terminal.get(cmd, function (data) {
      resolve(data)
    })
  })
}

module.exports = {
  getInstalledPackages: getInstalledPackages
}
