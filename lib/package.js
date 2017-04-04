const npmFacade = require('./npm_facade')
const terminalParser = require('./terminal_parser')
const logger = require('./logger')

function getInstalledDependencies() {
  return npmFacade
    .getInstalledPackages()
    .then(terminalParser.getInstalledPackages)
    .then(terminalParser.parsePackagesNames)
    .catch((err) => logger.error(err))
}

function installMissingDependencies(dependencies) {
  return npmFacade
    .installPackages(dependencies)
}

async function validateMissingDependencies(missingDependencies) {
  let results = await npmFacade.searchPackages(missingDependencies)
  let existentPackages = []
  let nonExistentPackages = []

  for (let result of results) {
    let pkgExists = false;
    for (let npmPkg of result.npmRepositoryPackages) {
      if (npmPkg.name === result.name) {
        pkgExists = true
      }
    }
    if (pkgExists){
      existentPackages.push(result.name)
    } else {
      nonExistentPackages.push(result.name)
    }
  }

  return {
    existentPackages: existentPackages,
    nonExistentPackages: nonExistentPackages
  }
}

module.exports = {
  getInstalledDependencies: getInstalledDependencies,
  installMissingDependencies: installMissingDependencies,
  validateMissingDependencies: validateMissingDependencies
}