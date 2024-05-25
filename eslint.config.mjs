import withNuxt from './.nuxt/eslint.config.mjs';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default withNuxt({
  rules: {
    'no-console': 'warn',
    'no-empty': 'warn', // temporary
    '@typescript-eslint/no-explicit-any': 'warn', // temporary
    '@typescript-eslint/ban-types': 'warn', // temporary
  },
}).append({
  ...eslintPluginPrettierRecommended,
  rules: {
    'prettier/prettier': 'warn',
  },
});
