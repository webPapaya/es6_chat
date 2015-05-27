"use strict";

var gulp        = require('gulp');
var watchify    = require('watchify')
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var plugins = require('gulp-load-plugins')();

var dirs = {
    src:     './source/',
    srcJS:   './source/js/',
    srcCSS:  './source/css/',
    tmp:     './tmp/',
    tmpJS:   './tmp/js/',
    tmpCSS:  './tmp/css/',
    dist:    './dist/',
    distJS:  './dist/js/',
    distCSS: './dist/css/',
    test:    './test/'
};

// Transpile ES6 and React Components and
// resolves dependencies with browserify
gulp.task('transpile-js', function() {
    return browserify({
        entries:    (dirs.srcJS + 'app.js'),
        extensions: ['.jsx', '.js'],
        debug:      true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest(dirs.tmpJS))
    .pipe(plugins.livereload())
});

// Reload the HTML
gulp.task('transpile-html', function() {
    return gulp.src('source/**/*.html')
        .pipe(plugins.livereload());
});

gulp.task('transpile-css', function () {
    return gulp.src(dirs.srcCSS + '*.less')
        .pipe(plugins.less())
        .pipe(gulp.dest(dirs.tmpCSS))
        .pipe(plugins.livereload());
});

gulp.task('test', function () {
    return gulp.src(dirs.test + 'test.js')
        .pipe(plugins.mocha({reporter: 'nyan'}))
        .pipe(plugins.livereload());
});

gulp.task('watch', function () {
    plugins.livereload.listen();
    plugins.connect.server({
        root: [dirs.tmp, dirs.src],
        port: 8080,
        livereload: true
    });

    gulp.src(dirs.src + 'index.html')
        .pipe(plugins.open('', { url: 'http://localhost:8080' }));

    gulp.watch('source/**/*.js',   ['transpile-js']);
    gulp.watch('source/**/*.html', ['transpile-html']);
    gulp.watch('source/**/*.less', ['transpile-css']);
});

gulp.task('default',     ['transpile-js', 'transpile-css', 'transpile-html', 'watch']);
gulp.task('watch-tests', function() {
    gulp.watch([
            'source/**/*.js',
            'source/**/*.jsx',
            'test/**/*.js'
        ],
        ['test']
    );
});