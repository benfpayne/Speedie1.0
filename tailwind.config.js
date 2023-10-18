/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        primary: '#FF8666',
        primaryTwo: '#FF8271',
        primaryBackground: '#FAE7E2',
        greenBackground: '#243500',
        accentGreen: '#E1FFA1',
        grayBackground: '#FBFBFB',
        lightGreenBackground: '#F2F6E8',
        grayAccent: '#6C6E7B',
        accent: '#fbece7',
        accentTwo: '#FAE7E2',
        tan: '#E6E3DD',

        silver: {
          100: '#d5c2bb',
          200: '#c0b3af'
        }
      },
      fontFamily: {
        sans: ['Poppins'],
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
