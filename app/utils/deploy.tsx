export const returnBasePathDependingOnEnv = () => {
  if (process.env.NODE_ENV === 'production') return `/${process.env.REPO_NAME}`;

  return '';
};
