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
        namedGroups: ['one', 'two'],
        columnCount: [1, 2, 3],
        extend: {
            colors: {
                primary: '#720f21',
                secondary: '#00255a',
                base: '#40526a'
            },
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
                            color: '#720f21',
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
                        },
                        img: {
                            width: '100%'
                        },
                        figure: {
                            width: '100%!important'
                        },
                        iframe: {
                            maxWidth: '100%!important'
                        }
                    }
                },
                incard: {
                    css: {
                        a: {
                            color: 'inherit',
                            '&:hover': {
                                color: 'var(--color-link-hover,#720f21)'
                            }
                        }
                    }
                }
            }
        }
    },
    variants: {
        columnCount: ['responsive'],
        columnGap: ['responsive'],
        columnWidth: ['responsive'],
        columnRuleColor: ['responsive'],
        columnRuleWidth: ['responsive'],
        columnRuleStyle: ['responsive'],
        columnFill: ['responsive'],
        columnSpan: ['responsive']
    },
    plugins: [
        require('tailwindcss-multi-column')(),
        require('@tailwindcss/typography')
    ]
};
