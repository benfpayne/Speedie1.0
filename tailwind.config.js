/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: '#af948c',
        accent: '#fbece7',
        accentTwo: '#FAE7E2',
        tan: '#E6E3DD',
        silver: {
          100: '#d5c2bb',
          200: '#c0b3af'
        }
      },
      fontFamily: {
        sans: ['Josefin Sans'],
        serif: ['Playfair Display']
      },
      fontSize: {
        xxs: '0.5rem' // Add a smaller font size
      },
      lineHeight: {
        2: '0.5rem' // Add a smaller line-height
      },
      borderRadius: {
        '11xl': '30px'
      },
      width: {
        'min-content': 'min-content'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};