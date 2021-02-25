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

  const params = await octokit.repos.getContent({
    owner,
    repo,
    ref,
    path: name,
  }).then(({ data }) => Promise.resolve({
    ...defaultParams,
    sha: data.sha,
  }))
  .catch(() => Promise.resolve(defaultParams));

  await octokit.repos.createOrUpdateFileContents(params);
};

module.exports = commitApiDoc;
