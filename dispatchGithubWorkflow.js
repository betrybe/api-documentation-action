const dispatchGithubWorkflow = async (options) => {
  const {
    octokit,
    owner,
    repo,
    workflow_id,
    ref,
  } = options;

  await octokit.actions.createWorkflowDispatch({
    owner,
    repo,
    workflow_id,
    ref,
  });
};

module.exports = dispatchGithubWorkflow;
