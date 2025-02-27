import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    'no-console': 'warn',
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'always', // allow self-closing for consistency
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
