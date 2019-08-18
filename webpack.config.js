const path = require('path');

module.exports = {
    entry: './src/main/webapp/index.js',
    devtool: 'sourcemaps',
    cache: true,
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './src/main/resources/static')
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader']},
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: ['babel-plugin-transform-class-properties']
                    }
                }]
            }
        ]
    }
};