const path = require('path');

module.exports = {
    entry: './src/block.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js'
    },
    externals: {
        '@wordpress/blocks': 'wp.blocks',
        '@wordpress/i18n': 'wp.i18n',
        '@wordpress/element': 'wp.element',
        '@wordpress/components': 'wp.components',
        '@wordpress/block-editor': 'wp.blockEditor'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    }
};
