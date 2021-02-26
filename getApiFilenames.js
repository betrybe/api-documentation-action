const fs = require('fs');
const path = require('path');


const getApiFilenames = (dir, ignoredDirs = ['node_modules']) => {
  const subdirs = fs.readdirSync(dir);
  const docs = subdirs.map(subdir => {
    const fileOrDir = path.join(dir, subdir);
    return (fs.statSync(fileOrDir).isDirectory() ? getApiFilenames(fileOrDir, ignoredDirs) : getApiFile(fileOrDir, ignoredDirs));
  });
  return docs
    .filter(file => file !== null)
    .reduce((files, file) => files.concat(file), []);
};

const getApiFile = (filename, ignoredDirs) => {
  const isIgnored = ignoredDirs.some(dir => filename.includes(dir));
  return (path.extname(filename) === '.apib' && !isIgnored) ? filename : null;
};

module.exports = getApiFilenames;
