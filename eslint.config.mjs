import withNuxt from './.nuxt/eslint.config.mjs';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default withNuxt({
  rules: {
    'no-console': 'warn',
    'no-empty': 'warn', // temporary
    '@typescript-eslint/ban-types': 'warn', // temporary
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'always', // temporary?: allow self-closing for consistency
        },
      },
    ],
  },
}).append({
  ...eslintPluginPrettierRecommended,
  rules: {
    'prettier/prettier': 'warn',
  },
});
