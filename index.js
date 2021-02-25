const core = require('@actions/core');
const github = require('@actions/github');

const getApiFilenames = require('./getApiFilenames');
const generateApiDoc = require('./generateApiDoc');
const commitApiDoc = require('./commitApiDoc');


// most @actions toolkit packages have async methods
async function run() {
  try {
    const root = process.env.GITHUB_WORKSPACE || process.cwd();

    const owner = core.getInput('owner', { required: true });
    const repo = core.getInput('repo', { required: true });
    const ref = core.getInput('ref', { required: true });
    const token = core.getInput('token', { required: true });

    core.startGroup('Print inputs');
    core.debug(root, owner, repo, ref);
    core.endGroup();

    const octokit = new github.getOctokit(token);

    const apiFilenames = getApiFilenames(root);
    const docFilenames = apiFilenames.map(file => generateApiDoc(file));

    for(const doc of docFilenames) {
      await commitApiDoc({
        octokit,
        owner,
        repo,
        ref,
        file: doc,
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

module.exports = run;
