/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(220, 20%, 15%)',
        surface: 'hsl(220, 20%, 20%)',
        accent: 'hsl(160, 70%, 50%)',
        primary: 'hsl(210, 70%, 50%)',
        'text-primary': 'hsl(0, 0%, 95%)',
        'text-secondary': 'hsl(0, 0%, 70%)',
        success: 'hsl(120, 60%, 50%)',
        warning: 'hsl(45, 90%, 60%)',
        danger: 'hsl(0, 70%, 60%)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      },
      spacing: {
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
      },
      boxShadow: {
        'card': '0 2px 8px hsla(0, 0%, 0%, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
