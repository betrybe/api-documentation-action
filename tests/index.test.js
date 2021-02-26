jest.mock('@actions/core');

const { getInput } = require('@actions/core');

const run = require('../index');


describe('1', () => {
  it('as', async () => {
    getInput
      .mockReturnValueOnce('my-org')
      .mockReturnValueOnce('my-repo')
      .mockReturnValueOnce('my-branch')
      .mockReturnValueOnce('my-token')
    await run();
  });
});
