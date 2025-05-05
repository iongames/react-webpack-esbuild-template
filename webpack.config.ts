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
        publicPath: 'auto',
    },
    watchOptions: { ignored: ['**/node_modules/**', '**/@mf-types/**'] },
    devServer: {
        hot: true,
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
            filename: 'entry.js',
            remotes: {
                remote_app: 'remote_app@http://localhost:3001/mf-manifest.json',
            },
            exposes: {
                // Set the modules to be exported, default export as '.'
                //'./button': './src/components/button',
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
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
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
                                plugins: [tailwindcss, autoprefixer],
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
