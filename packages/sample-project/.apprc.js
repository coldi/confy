module.exports = {
    presets: ['typescript', 'react', 'sass'],
    options: {
        entryFiles: ['styles/main.scss', 'index.ts'],
        title: 'Sample Project',
        htmlTemplate: './templates/index.ejs',
        port: 9999,
    },
};
