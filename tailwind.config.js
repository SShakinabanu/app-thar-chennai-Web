/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#D14023', // Rust Orange
                    dark: '#b0351d',
                    light: '#e35a3d',
                },
                secondary: '#1a1a1a',
                accent: '#ffd700',
                cream: '#F2EFE9', // Light Theme Background
                dark: {
                    DEFAULT: '#050505',
                    surface: '#0f0f0f',
                    lighter: '#1a1a1a',
                }
            },
            fontFamily: {
                outfit: ['Outfit', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
                oswald: ['Oswald', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.5s ease-out forwards',
                'reveal': 'reveal 1s cubic-bezier(0.77, 0, 0.175, 1) forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                reveal: {
                    '0%': { transform: 'translateY(100%)' },
                    '100%': { transform: 'translateY(0)' },
                }
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
