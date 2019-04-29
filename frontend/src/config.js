const config = {
  git: {
    hash: process.env.ReactAppGitHash
  },
  site: {
    api: process.env.ReactAppServiceEndpoint,
    url: process.env.ReactAppDemoUrl
  }
};

export default config;
