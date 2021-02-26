const path = require('path');
const fs = require('fs');
const core = require('@actions/core');
const { spawnSync } = require('child_process');

const generateApiDoc = (filename) => {
  const encoding = 'utf-8';
  const content = fs.readFileSync(filename, encoding);

  const { dir, name } = path.parse(filename);
  const ext = 'html';
  const output = `${dir}/${name}.${ext}`;

  const args = [
    'run',
    'aglio',
    '--',
    '-i',
    filename,
    '-o',
    output,
  ];

  const commandProcess = spawnSync('npm', args);

  if (commandProcess.status === 0) {
    return {
      name: buildProjectName(output, name, ext),
      content: Buffer.from(content, encoding).toString('base64'),
    };
  }
  core.error(commandProcess);
  return null;
};

const buildProjectName = (output, filename, extension) => {
  const outputPaths = output.split('/');
  const docsNameIndex = outputPaths.findIndex(element => element === 'docs');
  const projectName = outputPaths[docsNameIndex - 1];

  return `${projectName}_${filename}.${extension}`;
};

module.exports = generateApiDoc;
