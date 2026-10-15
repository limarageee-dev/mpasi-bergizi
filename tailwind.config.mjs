/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FAF4FC',
          100: '#F4E5F8',
          200: '#EACBF2',
          300: '#DBA6E7',
          400: '#C273D6',
          500: '#9E3AA7',
          600: '#7B2B80', // WARNA BRAND UTAMA
          700: '#641F69',
          800: '#4E1852',
          900: '#3D1240',
        },
        peach: {
          50: '#FFF5F3',
          100: '#FFE8E4',
          200: '#FFD5CE',
          400: '#FF8A7A',
          500: '#FF6F61',
          600: '#E85446',
        },
        honey: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        mint: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
        },
        babyblue: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          400: '#38BDF8',
          500: '#0EA5E9',
        },
        warmbg: '#FAF8F5',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(123, 43, 128, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 10px 30px -5px rgba(123, 43, 128, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 25px -5px rgba(123, 43, 128, 0.35)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
};
