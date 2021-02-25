const commitApiDoc = require('../commitApiDoc');

const client = {
  repos: {
    getContent: jest.fn(),
    createOrUpdateFileContents: jest.fn(),
  }
};

const run = () => {
  return commitApiDoc({
    client,
    owner: 'my-org',
    repo: 'my-repo',
    ref: 'my-branch',
    file: {
      name: 'project1_hello.html',
      content: 'IyBHcm91cCBIZWxsbyBTZXJ2aWNlCgojIyBHRVQgL2hlbGxvCisgUmVzcG9uc2UgMjAwICh0ZXh0L3BsYWluKQoKICAgICAgICBIZWxsbyEK',
    }
  });
};

describe('commitApiDoc', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('when file do not exists in repository its should be created', async () => {
    client.repos.getContent
      .mockImplementation(() => Promise.reject(Error('Not Found')));
    client.repos.createOrUpdateFileContents
      .mockResolvedValue({
        data: {
          content: {
            name: 'project1_hello.html',
            path: 'project1_hello.html',
            sha: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391'
          }
        }
      });

    await run();

    expect(client.repos.getContent).toHaveBeenCalledWith({
      owner: 'my-org',
      repo: 'my-repo',
      ref: 'my-branch',
      path: 'project1_hello.html',
    });
    expect(client.repos.createOrUpdateFileContents).toHaveBeenCalledWith({
      owner: 'my-org',
      repo: 'my-repo',
      path: 'project1_hello.html',
      message: 'Commiting file project1_hello.html',
      content: 'IyBHcm91cCBIZWxsbyBTZXJ2aWNlCgojIyBHRVQgL2hlbGxvCisgUmVzcG9uc2UgMjAwICh0ZXh0L3BsYWluKQoKICAgICAgICBIZWxsbyEK',
      branch: 'my-branch',
    });
  });

  it('when file exists in repository the file should be updated', async () => {
    client.repos.getContent
      .mockResolvedValue({
        data: {
          name: 'project1_hello.html',
          path: 'project1_hello.html',
          sha: '3d21ec53a331a6f037a91c368710b99387d012c1',
        }
      });
    client.repos.createOrUpdateFileContents
      .mockResolvedValue({
        data: {
          content: {
            name: 'project1_hello.html',
            path: 'project1_hello.html',
            sha: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391'
          }
        }
      });

    await run();

    expect(client.repos.getContent).toHaveBeenCalledWith({
      owner: 'my-org',
      repo: 'my-repo',
      ref: 'my-branch',
      path: 'project1_hello.html',
    });
    expect(client.repos.createOrUpdateFileContents).toHaveBeenCalledWith({
      owner: 'my-org',
      repo: 'my-repo',
      path: 'project1_hello.html',
      message: 'Commiting file project1_hello.html',
      content: 'IyBHcm91cCBIZWxsbyBTZXJ2aWNlCgojIyBHRVQgL2hlbGxvCisgUmVzcG9uc2UgMjAwICh0ZXh0L3BsYWluKQoKICAgICAgICBIZWxsbyEK',
      sha: '3d21ec53a331a6f037a91c368710b99387d012c1',
      branch: 'my-branch',
    });
  });
});
