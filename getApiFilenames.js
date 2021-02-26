const fs = require('fs');
const path = require('path');


const getApiFilenames = (dir) => {
  const subdirs = fs.readdirSync(dir);
  const docs = subdirs.map(subdir => {
    const fileOrDir = path.join(dir, subdir);
    return (fs.statSync(fileOrDir).isDirectory() ? getApiFilenames(fileOrDir) : getApiFile(fileOrDir));
  });
  return docs
    .filter(file => file !== null)
    .reduce((files, file) => files.concat(file), []);
};

const getApiFile = (filename) =>
  (path.extname(filename) === '.apib' && !path.dirname(filename).includes('node_modules')) ? filename : null;

module.exports = getApiFilenames;
