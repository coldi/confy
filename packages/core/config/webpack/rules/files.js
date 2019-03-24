const path = require('path');

module.exports = (options) => {
    const assetsDir = path.basename(options.assetsDir);

    return {
        test: [
            /\.(jpg|jpeg|png|gif|webp|svg|eot|otf|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/,
        ],
        loader: 'url-loader',
        options: {
            // Use inline base64 URI
            limit: options.inlineFileSize,
            // Otherwise fallback to file
            name: `${assetsDir}/_processed_/[name].[hash:5].[ext]`,
        },
    };
};
