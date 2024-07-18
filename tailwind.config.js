import defaultTheme from 'tailwindcss/defaultTheme';
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.jsx',
  ],

  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 25 column grid
        '25': 'repeat(25, minmax(0, 1fr))',
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
        schedule: 'rgba(0, 180, 173, 1)',
        textschedule: 'rgba(212, 241, 243, 1)',
        hold: 'rgba(211, 215, 245, 1)',
        texthold: 'rgba(69, 79, 162, 1)',
        followup: 'rgba(85, 195, 149, 1)',
        yellow: 'rgba(249, 123, 48, 1)',
        'custom-border': 'rgba(69, 83, 97, 1)',
      },
    },
  },
});
