const info = require("package-info")

function getDependenciesFromFileContent(fileContent) {
  const base64Encoded = fileContent.data.content
  const decoded = new Buffer(base64Encoded, 'base64').toString("ascii");
  const parsed = JSON.parse(decoded)
  return parsed.dependencies
}

function getAnnotationLevel(license) {
  const licenseLevels = {
    "Apache": "warning",
    "GPL": "failure"
  }
  for (const licenseInLevels of Object.keys(licenseLevels)) {
    if (license.toLowerCase().includes(licenseInLevels.toLowerCase())) {
        return licenseLevels[licenseInLevels]
    }
  }
  return "notice"
}

function addLineNumbers(dependencies, pkgJSON) {
  const lines = new Buffer(pkgJSON.data.content, 'base64').toString("ascii").split("\n")
    Object.keys(dependencies).forEach(dependency => {
      let lineForDep
      lines.forEach((line, index) => {
          if (new RegExp(`"${dependency}"`).test(line)) {
              dependencies[dependency]["lineNumber"] = index + 1
          }
      })
    })
  return Object.keys(dependencies).map(dep => dependencies[dep])
}

function getShas(context) {
  let headSha, baseSha
    if (context.payload.check_suite.pull_requests.length === 0) {
      // Check for single commit
      headSha = context.payload.check_suite.after
      // Hack, because analysing exactly what changed in a single commit is difficult       
      baseSha = context.payload.repository.default_branch
    } else {
      // Check for full PR
      const pull = context.payload.check_suite.pull_requests[0]
      headSha = pull.head.sha
      baseSha = pull.base.sha
    }
  return [headSha, baseSha]
}

async function getNewDependencies(beforePkgJson, afterPkgJson) {
  const beforeDependencies = Object.keys(getDependenciesFromFileContent(beforePkgJson))
  const afterDependencies = Object.keys(getDependenciesFromFileContent(afterPkgJson))
  
  const newDependencies = afterDependencies.filter(dep => !beforeDependencies.includes(dep))
  
  let dependencies = {}
  await Promise.all(newDependencies.map(async (dep) => {
    const meta = await info(dep)
    dependencies[dep] = meta
  }))

  dependencies = addLineNumbers(dependencies, afterPkgJson)
  return dependencies
}

module.exports = {
  getDependenciesFromFileContent,
  getAnnotationLevel,
  addLineNumbers,
  getShas,
  getNewDependencies
}