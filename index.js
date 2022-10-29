const core = require('@actions/core');
const github = require('@actions/github');

const getApiFilenames = require('./getApiFilenames');
const generateApiDoc = require('./generateApiDoc');
const commitApiDoc = require('./commitApiDoc');
const dispatchGithubWorkflow = require('./dispatchGithubWorkflow');

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
    const themeVariables = core.getInput('themeVariables', { required: false });
    const themeTemplate = core.getInput('themeTemplate', { required: false });

    core.startGroup('🕹 INPUTS ↴');
    core.info(`🪴 Root → ${root}`);
    core.info(`👑 Owner → ${owner}`);
    core.info(`📂 Repository → ${repo}`);
    core.info(`🏷️ Ref(tag/branch) → ${ref}`);
    core.endGroup();
    

    const octokit = github.getOctokit(token);
    const apiFilenames = getApiFilenames(root);

    core.startGroup('🗂 API FILES ↴');
    core.info(`📄 Files → ${apiFilenames}`);
    core.endGroup();

    core.startGroup('🔄 Processing ↴');

    const docFilenames = apiFilenames
      .map(file => generateApiDoc(file, themeVariables, themeTemplate))
      .filter(file => file != null)


    for(const doc of docFilenames) {
      await commitApiDoc({
        octokit,
        owner,
        repo,
        ref,
        file: doc,
      });
    }

    core.info(`📩 Dispatching Workflow`);
    core.endGroup();
    await dispatchGithubWorkflow({
      octokit,
      owner: targetOwner,
      repo: targetRepo,
      workflow_id: targetWorkflowId,
      ref: targetRef,
    });

  } catch (error) {
    core.setFailed(error);
  }
}

run();

module.exports = run;
