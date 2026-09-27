/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#121417',
          surfacedark: '#1C1F24',
          light: '#F8F9FA',
          white: '#FFFFFF',
          text: '#181A1D',
          muted: '#6C757D',
          gold: '#C5A059',
          goldhover: '#A88442',
          border: '#E3E6EA',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        stone: '0 4px 20px rgba(0, 0, 0, 0.05)',
        stonedark: '0 8px 30px rgba(0, 0, 0, 0.35)',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
};
