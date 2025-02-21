export const useIsClient = () => {
  return typeof window !== 'undefined';
};
