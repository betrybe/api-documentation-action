const dispatchGithubWorkflow = require('../dispatchGithubWorkflow');

const octokit = {
  rest:{
    actions: {
      createWorkflowDispatch: jest.fn(),
    }
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
    octokit.rest.actions.createWorkflowDispatch.mockResolvedValue({});

    await run();

    expect(octokit.rest.actions.createWorkflowDispatch).toHaveBeenCalledWith({
      owner: 'my-org',
      repo: 'my-repo',
      workflow_id: 'main.yml',
      ref: 'my-branch',
    });
  });
});
