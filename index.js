const core = require('@actions/core');
const github = require('@actions/github');

const getApiFilenames = require('./getApiFilenames');
const generateApiDoc = require('./generateApiDoc');
const commitApiDoc = require('./commitApiDoc');
const dispatchGithubWorkflow = require('./dispatchGithubWorkflow');

// most @actions toolkit packages have async methods
async function run() {
  try {
    const root = process.env.GITHUB_WORKSPACE || process.cwd();

    const owner = core.getInput('owner', { required: true });
    const repo = core.getInput('repo', { required: true });
    const ref = core.getInput('ref', { required: true });
    const token = core.getInput('token', { required: true });
    const targetOwner = core.getInput('targetOwner', { required: true });
    const targetRepo = core.getInput('targetRepo', { required: true });
    const targetRef = core.getInput('targetRef', { required: true });
    const targetWorkflowId = core.getInput('targetWorkflowId', { required: true });

    core.startGroup('Print inputs');
    core.info(root);
    core.info(owner);
    core.info(repo);
    core.info(ref);
    core.endGroup();

    const octokit = new github.getOctokit(token);

    const apiFilenames = getApiFilenames(root);

    core.startGroup('api files');
    core.info(apiFilenames);
    core.endGroup();

    const docFilenames = apiFilenames.map(file => generateApiDoc(file));

    core.startGroup('doc files');
    core.info(docFilenames);
    core.endGroup();

    for(const doc of docFilenames) {
      await commitApiDoc({
        octokit,
        owner,
        repo,
        ref,
        file: doc,
      });
    }

    await dispatchGithubWorkflow({
      octokit,
      owner: targetOwner,
      repo: targetRepo,
      workflow_id: targetWorkflowId,
      ref: targetRef,
    });

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

module.exports = run;
