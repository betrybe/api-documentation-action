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
  }).then(({ data }) => ({
    ...defaultParams,
    sha: data.sha,
  }))
  .catch(() => defaultParams);

  await octokit.repos.createOrUpdateFileContents(params);
};

module.exports = commitApiDoc;
