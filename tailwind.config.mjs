/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F2F5F7',
          100: '#E6ECF2',
          200: '#CCD8E3',
          300: '#A7BACC',
          400: '#7B96B0',
          500: '#547494',
          600: '#435F7A',
          700: '#364C61',
          800: '#2C3C4D',
          900: '#233140',
          950: '#0D131A',
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'rgb(31, 41, 55)',
            lineHeight: '1.75',
            'h1, h2, h3, h4': {
              color: 'rgb(17, 24, 39)',
              fontWeight: '700',
            },
            a: {
              color: 'rgb(37, 99, 235)',
              '&:hover': {
                color: 'rgb(29, 78, 216)',
              },
            },
            code: {
              color: 'rgb(31, 41, 55)',
              backgroundColor: 'rgb(243, 244, 246)',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
          },
        },
        dark: {
          css: {
            color: 'rgb(229, 231, 235)',
            'h1, h2, h3, h4': {
              color: 'rgb(243, 244, 246)',
            },
            a: {
              color: 'rgb(96, 165, 250)',
              '&:hover': {
                color: 'rgb(147, 197, 253)',
              },
            },
            code: {
              color: 'rgb(243, 244, 246)',
              backgroundColor: 'rgb(31, 41, 55)',
            },
            blockquote: {
              color: 'rgb(229, 231, 235)',
              borderLeftColor: 'rgb(75, 85, 99)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
