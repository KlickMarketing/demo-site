const config = {
  git: {
    hash: process.env.ReactAppGitHash
  },
  site: {
    url: process.env.ReactAppSiteUrl,
    api: process.env.ReactAppServiceEndpoint,
  }
};

export default config;
