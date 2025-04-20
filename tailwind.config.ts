// @ts-expect-error daisyui has no type declarations
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  plugins: [daisyui],
  theme: {
    extend: {},
  },
};
