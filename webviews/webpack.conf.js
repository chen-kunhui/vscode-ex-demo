const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const root = path.resolve(__dirname, '..');

module.exports = (env = {}) => ({
    mode: env.prod ? 'production' : 'development',
    devtool: env.prod ? 'source-map' : 'eval-cheap-module-source-map',
    context: __dirname,
    entry: {
        common: "./entry/common.js",
        vueDemo: "./entry/vueDemo.js"
    },
    output: {
        path: path.resolve(root, './dist/webview'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.css', '.vue', 'scss']
    },
    module: {
        rules: [
        {
            test: /\.vue$/,
            use: 'vue-loader'
        },
        {
            test: /\.(ttf|eot|svg|woff|woff2)$/,
            use: 'url-loader'
        },
        {
            test: /\.png$/,
            use: {
                loader: 'url-loader',
                options: { limit: 8192 }
            }
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
            ],
        },
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        },
        {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: 'ts-loader'
        }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
})