/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        screens: {
            medium: '900px',
            small: '600px',
        },
        extend: {
            colors: {
                'color-cyan': '#203340',
                'color-black': '#141314',
                'color-black-semilight': '#1c1b1d',
                'color-black-light': '#242324',
                'color-black-bright': '#353535',
                'color-gray': '#858585',
                'color-gray-light': '#a5a5a5',
                'color-white-light': '#e6e1e3',
                'color-white': '#f5f5f7',
                'color-blue': '#1a74e8',
                'color-blue-light': '#1d94f0',
                'color-skyblue': '#a8c7fa',
            },
            width: {
                'editor-lg': '400px',
            },
            height: {
                'header-height': 'var(--header-height)',
                'footer-height': 'var(--footer-height)',
            },
            padding: {
                'header-height': 'var(--header-height)',
            },
            margin: {
                'footer-height': 'calc(var(--footer-height) * -1)',
            },
        },
    },
    plugins: [],
}
