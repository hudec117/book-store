const configureAPI = require('./server/configure');

module.exports = {
    devServer: {
        before: configureAPI
    },
    configureWebpack: {
        devtool: 'source-map'
    }
};