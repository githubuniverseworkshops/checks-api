# Getting started with the GitHub Checks API

### Workshop Pre-requisites

- A GitHub.com account
- A Glitch.com account
- Bring a ~t-shirt~ repository that you don't mind getting messy

### Useful links throughout the workshop
- API documentation to create a check run: https://developer.github.com/v3/checks/runs/#create-a-check-run
- API documentation for getting a single file: https://developer.github.com/v3/repos/contents/#get-contents
- Page where you can view and re-deliver webhooks: https://github.com/settings/apps/your-app-name/advanced
- Documentation for the Node GitHub SDK: https://octokit.github.io/rest.js/

### Workshop steps
1. Fork the [universeworkshops/license-checker-demo](https://github.com/universeworkshops/license-checker-demo) repo to your personal account
2. Create your Glitch app by following this link: https://glitch.com/edit/#!/remix/license-checker-start
3. Wait for Glitch to load and for it to install all the dependencies. You can see progress by clicking on "Status" in the top left corner
4. Click the "Show Live" button at the top of the page. A new tab should open and the page should have a "Register GitHub App" button
4. Click the "Register GitHub App" button and choose a name for your GitHub App. A GitHub app will be created for you in the background. Once it is complete you will see a new page that asks you where you want to install your new app.
5. On this page, select the "Only select repositories" and in the dropdown choose the "license-checker-demo" repository that you forked in step 1.
6. In your current tab, go to the license-checker-demo repository. It should be at github.com/your-username/license-checker-demo
7. Then head back to Glitch, it's time to write some code!

### Extend and improve your app further
- Create a check saying “No new dependencies found” if the package.json file was not modified in the PR or commit
- Customise warning/notices
- Create a pull request review mentioning a specific team whenever there is a dependency change
- Add an [action button](https://developer.github.com/changes/2018-05-23-request-actions-on-checks/) to "approve the dependency changes"
- Modify the check “conclusion” based on the changed dependencies
- Experiment further with the Checks API and build something completely different
