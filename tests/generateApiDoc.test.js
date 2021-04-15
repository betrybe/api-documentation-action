jest.mock('child_process');

const fs = require('fs');
const { spawnSync } = require('child_process');
const generateApiDoc = require('../generateApiDoc');

describe('generateApiDoc', () => {
  it('when apib file is passed the html documentation should be generated', () => {
    spawnSync.mockReturnValue({
      status: 0,
      signal: null,
      output: [],
    });

    const encoding = 'utf-8';
    const file = fs.readFileSync('tests/repo/project1/docs/hello.html', encoding);

    const apibFilename = 'tests/repo/project1/docs/hello.apib';
    const expected = {
      name: 'project1_hello.html',
      content: Buffer.from(file, encoding).toString('base64'),
    };

    expect(generateApiDoc(apibFilename)).toMatchObject(expected);
    expect(spawnSync).toHaveBeenCalledWith(
      './node_modules/./.bin/aglio',
      [
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
      './node_modules/./.bin/aglio',
      [
        '-i', 'tests/repo/project1/docs/hello.apib',
        '-o', 'tests/repo/project1/docs/hello.html'
      ]
    );
  });
});
