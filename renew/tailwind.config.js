/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                'color-cyan': '#203340',
                'color-card': 'rgba(50, 79, 130, 0.3)',
                'color-black': '#141314',
                'color-black-light': '#1c1b1d',
                'btn-bg-lightblack': '#242324',
                'border-black': '#858585',
                'btn-border-lightblack': '#a5a5a5',
                'text-white': '#e6e1e3',
                'color-white': '#f5f5f7',
                'color-blue': '#1a74e8',
            },
            width: {
                'editor-lg': '400px',
            },
            height: {
                'header-height': '100px',
                'footer-height': '70px',
            },
        },
    },
    plugins: [],
}
