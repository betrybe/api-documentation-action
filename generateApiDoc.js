const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');

const generateApiDoc = (filename, themeVariables = 'default', themeTemplate = 'default') => {
  const { dir, name } = path.parse(filename);
  const encoding = 'utf-8';
  const ext = 'html';
  const output = `${dir}/${name}.${ext}`;
  const args = [
    'aglio',
    '-i', filename,
    '--theme-variables', themeVariables,
    '--theme-template', themeTemplate,
    '-o',
    output,
  ];

  const commandProcess = spawnSync('npx', args);

  if (commandProcess.status === 0) {
    const content = fs.readFileSync(output, encoding);
    return {
      name: buildProjectName(output, name, ext),
      content: Buffer.from(content, encoding).toString('base64'),
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
