/// <binding BeforeBuild='build' />
var gulp = require("gulp");
var gUtil = require("gulp-util");
var path = require("path");
var webpack = require("webpack");

var commonsChunk = webpack.optimize.CommonsChunkPlugin;

var vendorChunk = {
    modules: ["react"],
    fileName: "vendor.201508141231.js"
};

gulp.task("build", function () {
    webpack(getWebpackConfig(), webpackCallback);

    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task("build-watch", function () {
    var config = getWebpackConfig();
    config.watch = true;

    webpack(config, webpackCallback);

    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});

function webpackCallback(err, stats) {
    if (err) {
        throw new gUtil.PluginError("webpack", err);
    }
}

function getWebpackConfig() {
    return {
        debug: true,
        devtool: 'sourcemap',
        entry: {
            vendor: vendorChunk.modules,
            main: './src/start.jsx'
        },
        output: {
            path: path.join(__dirname, './dist'),
            filename: 'app.bundle.js'
        },
        plugins: [
            new commonsChunk("vendor", vendorChunk.fileName)
        ],
        module: {
            loaders: [{
                test: /\.jsx$|\.js$/,
                loaders: ['babel?stage=0&optional[]=runtime'],
                exclude: /node_modules/,
                include: path.join(__dirname, './src')
            }]
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        }
    };
}