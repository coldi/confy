const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const settings = require('../../lib/settings');

module.exports = (options) => {
    const plugins = [];

    plugins.push(new CleanWebpackPlugin());

    plugins.push(new ESLintPlugin());

    // Resolve assets folder
    const assetsPath = path.resolve(settings.appPath, options.srcDir, options.assetsDir);

    // Add copy plugin if an assets folder exists
    if (fs.existsSync(assetsPath)) {
        const assetsOutputPath = path.resolve(
            settings.appPath,
            options.buildDir,
            path.basename(options.assetsDir)
        );

        plugins.push(
            new CopyWebpackPlugin({
                patterns: [{ from: assetsPath, to: assetsOutputPath }],
            })
        );
    }

    // Add html plugin if a template is set
    if (options.htmlTemplate) {
        plugins.push(
            new HtmlWebpackPlugin({
                title: options.title,
                template: path.resolve(
                    settings.appPath,
                    options.srcDir,
                    options.htmlTemplate
                ),
            }),
        );
    }

    // Add additional plugins for development
    if (options.devMode) {
        plugins.push(
            new webpack.HotModuleReplacementPlugin(),
        );

        return plugins;
    }

    // Add additional plugins for production
    plugins.push(
        new MiniCssExtractPlugin({
            filename: options.cssOutputFile,
            chunkFilename: options.cssChunkFile,
        }),
    );

    return plugins;
};
