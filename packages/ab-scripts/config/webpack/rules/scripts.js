module.exports = (addons) => ({
    test: /\.js$/,
    use: [
        {
            loader: 'babel-loader',
            options: {
                ...addons.babel,
                babelrc: false,
            },
        },
        {
            loader: 'eslint-loader',
        },
    ],
    exclude: /node_modules/,
});
