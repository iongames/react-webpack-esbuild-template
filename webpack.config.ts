import Dotenv from 'dotenv-webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { EsbuildPlugin } from 'esbuild-loader'
import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'
import path from 'path'

module.exports = {
    entry: './src/main.tsx',
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
                    'style-loader',
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
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        hot: true,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
        }),
    ],
    optimization: {
        minimizer: [
            new EsbuildPlugin({
                target: 'es2015',
                css: true,
            }),
        ],
    },
}
