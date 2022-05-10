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
    core.info(`\u001b[48;5;6m[info] Root -> ${root}`);
    core.info(`\u001b[48;5;6m[info] Owner -> ${owner}`);
    core.info(`\u001b[48;5;6m[info] Repository -> ${repo}`);
    core.info(`\u001b[48;5;6m[info] Ref(tag/branch) -> ${ref}`);
    core.endGroup();

    const octokit = new github.getOctokit(token);

    const apiFilenames = getApiFilenames(root);

    core.startGroup('Api files');
    core.info(`\u001b[48;5;6m[info] Files -> ${apiFilenames}`);
    core.endGroup();

    const docFilenames = apiFilenames.map(file => generateApiDoc(file));

    core.startGroup('Doc files');
    core.info(docFilenames);
    core.endGroup();

    core.startGroup('Processing');

    for(const doc of docFilenames) {

    core.info(`\u001b[48;5;6m[info] Committing file ${doc.name}`);

      await commitApiDoc({
        octokit,
        owner,
        repo,
        ref,
        file: doc,
      });
    }

    core.endGroup();
    core.info(`\u001b[48;5;6m[info] Dispatching Workflow`);
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
