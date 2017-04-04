const src = require('./src')
const package = require('./package')
const logger = require('./logger')

async function installer(name, sub, options) {
  let dependencies = await getDependencies()
  let missingDependencies = getMissingDependencies(dependencies)

  if (missingDependencies && missingDependencies.length > 0) {

    logger.info('installing missing dependencies')
    try {
      let installationInfo = await install(missingDependencies)
      if (installationInfo.nonExistentPackages.length > 0){
        logger.error(`the following packages were not found in the npm repository: \n\t\t· ${installationInfo.nonExistentPackages.join('\n\t\t\· ')}`)
      }
      if (installationInfo.installedPackages.length > 0){
        logger.info(`the following packages were installed: \n\t\t· ${installationInfo.installedPackages.join('\n\t\t\· ')}`)
      }
    } catch (err) {
      logger.error(err)
    }
  } else {
    logger.info('all required packages are installed')
    return
  }
}

async function getDependencies() {
  let srcPackages = src.getSrcDependencies()
  let installedPackages = package.getInstalledDependencies()

  return Promise
    .all([srcPackages, installedPackages])
    .then((value) => {
      return {
        srcPackages: value[0],
        installedPackages: value[1]
      }
    })
}

function getMissingDependencies(packages) {
  return packages.srcPackages.filter(
    (pkg) => packages.installedPackages.indexOf(pkg) === -1)
}

async function install(missingDependencies) {
  let validation = await package.validateMissingDependencies(missingDependencies)
  
  if (validation.existentPackages && validation.existentPackages.length> 0) {
    let stdout = await package.installMissingDependencies(validation.existentPackages)
  }

  return {
    installedPackages: validation.existentPackages,
    nonExistentPackages: validation.nonExistentPackages
  }
}

module.exports = installer

