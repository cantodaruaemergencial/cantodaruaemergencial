export const returnBasePathDependingOnEnv = () => {
  if (process.env.NODE_ENV === 'production')
    return `/${process.env.NEXT_PUBLIC_BUCKET_NAME}`;

  return '';
};
