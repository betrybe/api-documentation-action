const dispatchGithubWorkflow = require('../dispatchGithubWorkflow');

const octokit = {
  actions: {
    createWorkflowDispatch: jest.fn(),
  }
};

const run = () => {
  return dispatchGithubWorkflow({
    octokit,
    owner: 'my-org',
    repo: 'my-repo',
    workflow_id: 'main.yml',
    ref: 'my-branch',
  });
};

describe('dispatchGithubWorkflow', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch workflow', async () => {
    octokit.actions.createWorkflowDispatch.mockResolvedValue({});

    await run();

    expect(octokit.actions.createWorkflowDispatch).toHaveBeenCalledWith({
      owner: 'my-org',
      repo: 'my-repo',
      workflow_id: 'main.yml',
      ref: 'my-branch',
    });
  });
});
