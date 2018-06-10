module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-url': { url: 'rebase' },
        'postcss-mixins': {},
        'postcss-nested-ancestors': {},
        'postcss-nested': {},
        'postcss-calc': {},
        'postcss-for': {},
        'postcss-each': {},
        'postcss-simple-vars': { silent: true },
        'postcss-custom-media': {},
        'postcss-custom-properties': {},
        autoprefixer: {
            browsers: [
                'last 3 versions',
                'ie 9',
                'ff 24',
                'android 4.2',
                'ios >= 5'
            ]
        }
    }
};
