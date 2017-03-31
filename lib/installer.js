const fileParser = require('./file_parser')
const environmentHelper = require('./environment_helper')

async function installer (name, sub, options) {
  let packagesNames = await fileParser.getPackagesNames()
  let installedPackageNames = await environmentHelper.getInstalledPackages()
  console.log(installedPackageNames)
  // TODO compare arrays, prompt to install missing packages
}

module.exports = installer

