/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                'color-cyan': '#203340',
                'color-card': 'rgba(50, 79, 130,0.3)',
            },
        },
    },
    plugins: [],
}
