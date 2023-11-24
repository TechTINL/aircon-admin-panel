import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

const withMT = require('@material-tailwind/react/utils/withMT');

export default withMT({
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.jsx',
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      gridTemplateColumns: {
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
      // Any additional theme extensions from the second config
      // should be added here
    },
  },

  plugins: [forms /* any other plugins from the second config */],
});
