module.exports = {
    mode: 'jit',
    future: {
        purgeLayersByDefault: true,
        applyComplexClasses: true
    },
    purge: {
        content: [
            './pages/**/*.{js,ts,jsx,tsx}',
            './components/**/*.{js,ts,jsx,tsx}'
        ]
    },
    theme: {
        extend: {
            fontFamily: {
                heading: ['Museo', 'sans-serif'],
                body: ['Nunito', 'sans-serif']
            },
            spacing: {
                header: 'var(--header-height)'
            },
            typography: {
                DEFAULT: {
                    css: {
                        a: {
                            fontFamily: 'inherit',
                            color: '#6f96c5',
                            textDecoration: 'none',
                            fontWeight: 400,
                            '&:hover': {
                                color: '#c0b9a8'
                            }
                        },
                        strong: {
                            color: 'currentColor',
                            '&:hover': {
                                color: 'currentColor'
                            }
                        }
                    }
                },
                incard: {
                    css: {
                        a: {
                            color: 'inherit',
                            '&:hover': {
                                color: 'var(--color-link-hover,#6f96c5)'
                            }
                        }
                    }
                }
            }
        }
    },
    plugins: [require('@tailwindcss/typography')]
};
