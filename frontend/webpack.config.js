const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        fallback: {
            "zlib": require.resolve("browserify-zlib"),
            "path": require.resolve("path-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "util": require.resolve("util/"),
            "url": require.resolve("url/"),
            "buffer": require.resolve("buffer/"),
            "querystring": require.resolve("querystring-es3"),
            "fs": false,
            "net": false,
            "http": false
        }
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 8080,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        })
    ]
};
