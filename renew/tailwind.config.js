/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                'color-cyan': '#203340',
                'color-card': 'rgba(50, 79, 130, 0.3)',
                'header-black': '#141314',
                'footer-black': '#141314',
                'body-black': '#1c1b1d',
                'border-black': '#858585',
                'text-white': '#e6e1e3',
                'btn-bg-lightblack': '#242324',
                'btn-border-lightblack': '#a5a5a5',
            },
            width: {
                'editor-lg': '400px',
            },
        },
    },
    plugins: [],
}
