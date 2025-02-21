export default {
  '*': 'npm run format',
  '*.{js,jsx,ts,tsx}': 'npm run lint',
  '*.(ts,tsx)': 'npm run typecheck',
  '*.css': 'npm run stylelint',
};
