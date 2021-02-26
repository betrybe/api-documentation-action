jest.mock('child_process');

const { spawnSync } = require('child_process');
const generateApiDoc = require('../generateApiDoc');

describe('generateApiDoc', () => {
  it('when apib file is passed the html documentation should be generated', () => {
    spawnSync.mockReturnValue({
      status: 0,
      signal: null,
      output: [],
    });

    const apibFilename = 'tests/repo/project1/docs/hello.apib';
    const expected = {
      name: 'project1_hello.html',
      content: 'IyBHcm91cCBIZWxsbyBTZXJ2aWNlCgojIyBHRVQgL2hlbGxvCisgUmVzcG9uc2UgMjAwICh0ZXh0L3BsYWluKQoKICAgICAgICBIZWxsbyEK',
    };

    expect(generateApiDoc(apibFilename)).toMatchObject(expected);
    expect(spawnSync).toHaveBeenCalledWith(
      'npx',
      [
        'aglio',
        '-i', 'tests/repo/project1/docs/hello.apib',
        '-o', 'tests/repo/project1/docs/hello.html'
      ]
    );
  });

  it('when not apib file is passed the html documentation should be not generated', () => {
    spawnSync.mockReturnValue({
      status: 1,
      signal: null,
      output: [],
    });

    const apibFilename = 'tests/repo/project1/docs/hello.apib';
    const expected = null;

    expect(generateApiDoc(apibFilename)).toBe(expected);
    expect(spawnSync).toHaveBeenCalledWith(
      'npx',
      [
        'aglio',
        '-i', 'tests/repo/project1/docs/hello.apib',
        '-o', 'tests/repo/project1/docs/hello.html'
      ]
    );
  });
});
