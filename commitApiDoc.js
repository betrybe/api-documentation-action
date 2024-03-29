const core = require('@actions/core');

const commitApiDoc = async (options) => {
  const {
    octokit,
    owner,
    repo,
    ref,
    file
  } = options;
  const { name, content } = file;

  const defaultParams = {
    owner,
    repo,
    path: name,
    message: `Commiting file ${name}`,
    content,
    branch: ref,
  };

  const params = await octokit.rest.repos.getContent({
    owner,
    repo,
    ref,
    path: name,
  }).then(({ data }) => ({
    ...defaultParams,
    sha: data.sha,
  }))
  .catch((error) => {
    core.error(error)
    return defaultParams
  });
  
  await octokit.rest.repos.createOrUpdateFileContents(params);
};

module.exports = commitApiDoc;
