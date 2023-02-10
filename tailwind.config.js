/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '9.6rem',
    },
    letterSpacing: {
        tightest: '-.075em',
        tighter: '-.05em',
        tight: '-.025em',
        normal: '0',
        wide: '.025em',
        wider: '.05em',
        widest: '3.2rem'
    },
    extend: {
      colors: {
        'main-bg-color': '#e5e5e5',
        'sidenav': '#1e1e1e',
        'accent': '#820606'
      },
      boxShadow: {
        'signIn': '0.2rem 0.2rem 0.5rem rgba(0, 0, 0, 0.4)',
        'signInHover': '0.2rem 0.2rem 0.5rem rgba(0, 0, 0, 0.6)'
      }
    },
  },
  plugins: [],
}
