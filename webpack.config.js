const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "sass-loader"},
                ]
            }, {
                test: /\.ts(x*)$/,
                use: [
                    {loader: 'awesome-typescript-loader'}
                ]
            }, { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    entry: "./index.ts",
    output: {
        filename: 'index.js',
        path: path.resolve('.')
    },
    watch: true,
    mode: 'production',
    devtool: "#eval-source-map",
    target: "electron-main"
};