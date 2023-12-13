import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

const withMT = require('@material-tailwind/react/utils/withMT');

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.jsx',
  ],

  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        25: 'repeat(25, minmax(0, 1fr))',
      },
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#00B4AD',
        secondary: '#454FA2',
        'bg-light-gray': '#F8F8F8',
        'bg-input-gray': '#BCBDC0',
        'whatsapp-color': '#1BB950',
        'indigo-800': '#454FA2',
        'teal-500': '#00B4AD',
        'table-header-bg': '#F0F0F0',
        'border-gray': '#53616C',
      },
    },
  },

  plugins: [forms],
});
