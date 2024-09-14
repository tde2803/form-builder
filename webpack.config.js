const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

/**
 * @type {import('webpack').Configuration}
 */
module.exports = function (env, argv) {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/index.tsx',
        devtool: isProduction ? false : 'eval-source-map',
        output: {
            clean: true,
            filename: '[contenthash:8].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
            plugins: [new TsconfigPathsPlugin()],
        },
        mode: isProduction ? 'production' : 'development',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                import: true,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
        ],
        devServer: {
            port: 3000,
            historyApiFallback: true,
        },
    };
};
