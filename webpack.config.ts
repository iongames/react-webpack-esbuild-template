import Dotenv from 'dotenv-webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { EsbuildPlugin } from 'esbuild-loader'
import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'
import path from 'path'
import { ModuleFederationPlugin } from '@module-federation/enhanced/webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

module.exports = {
    entry: './src/main.ts',
    output: {
        clean: true,
        publicPath: 'auto',
    },
    watchOptions: { ignored: ['**/node_modules/**', '**/@mf-types/**'] },
    devServer: {
        hot: true,
        historyApiFallback: true,
        //port: 3001,
        // headers: {
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        //     'Access-Control-Allow-Headers': '*',
        // },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'host_app',
            filename: 'host_app_entry.js',
            remotes: {
                remote_app: 'remote_app@http://localhost:3001/mf-manifest.json',
            },
            exposes: {
                // Set the modules to be exported, default export as '.'
                // '.': './src/app',
            },
            shared: {
                react: {
                    singleton: true,
                    eager: true,
                },
                'react-dom': {
                    singleton: true,
                    eager: true,
                },
            },
        }),
        new Dotenv(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
            publicPath: '/',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                loader: 'esbuild-loader',
                exclude: '/node_modules/',
                options: {
                    target: 'es2015',
                    jsx: 'automatic',
                },
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: {
                                    '@tailwindcss/postcss': tailwindcss,
                                    autoprefixer,
                                },
                            },
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        minimizer: [
            new EsbuildPlugin({
                target: 'es2015',
                css: true,
            }),
        ],
        // runtimeChunk: 'single', enables hot reload for remote app
    },
}
