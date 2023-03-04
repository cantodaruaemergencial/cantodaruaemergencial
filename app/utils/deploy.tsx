export const returnBasePathDependingOnEnv = () => {
  if (process.env.GITHUB_ACTIONS)
    return `/${process.env.GITHUB_REPOSITORY?.replace(/.*?\//, '')}`;

  return '';
};
