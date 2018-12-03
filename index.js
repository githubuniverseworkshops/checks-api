// Helper functions that we can use
const {
  getAnnotationLevel,
  getShas,
  getNewDependencies
} = require("./helpers");

module.exports = (app) => {
  app.log('Yay! The app was loaded!!!')

  app.on('check_suite.requested', async context => {
    console.log(context.payload)
    const [headSha, baseSha] = getShas(context)
    
    // Our TODO list
    // 1. Get the dependencies before and after the change from the GitHub API
    // 2. Extract all new dependencies, and get license information from NPM
    // 4. Prepare annotations for the step (5)
    // 5. Create a check run using the GitHub API
    
    return context.github.checks.create({
      repo: context.payload.repository.name,
      owner: context.payload.repository.owner.login,
      name: "license-checker",
      head_sha: headSha,
      head_branch: context.payload.check_suite.head_branch,
      completed_at: new Date().toISOString(),
      status: "completed",
      conclusion: "success",
      output: {
        title: "No new dependencies detected",
        summary: "No new dependencies detected"
      }
    })
  })
}
