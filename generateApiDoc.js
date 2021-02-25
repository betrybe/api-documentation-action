const path = require('path');
const { spawnSync } = require('child_process');

const generateApiDoc = (filename) => {
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
      path: output,
      targetName: buildProjectName(output, name, ext),
    };
  }
  return null;
};

const buildProjectName = (output, filename, extension) => {
  const outputPaths = output.split('/');
  const docsNameIndex = outputPaths.findIndex(element => element === 'docs');
  const projectName = outputPaths[docsNameIndex - 1];

  return `${projectName}_${filename}.${extension}`;
};

module.exports = generateApiDoc;
