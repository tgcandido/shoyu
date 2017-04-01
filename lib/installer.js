const fileParser = require('./file_parser')
const environmentHelper = require('./environment_helper')

async function installer(name, sub, options) {
  let packages = await getPackagesNames()
  console.log(packages)
  // TODO compare arrays, prompt to install missing packages
}

async function getPackagesNames() {
  let srcPackagesNames = fileParser.getPackagesNames()
  let installedPackagesNames = environmentHelper.getInstalledPackages()

  return Promise
    .all([srcPackagesNames, installedPackagesNames])
    .then((value) => {
      return {
        srcPackagesNames : value[0],
        installedPackageNames : value[1]
      }
    })
}

module.exports = installer

