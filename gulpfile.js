"use strict";

var gulp        = require('gulp');
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var plugins     = require('gulp-load-plugins')();

var spawn = require('child_process').spawn;
var node;

var frontendDirs = {
    src:     './source/frontend/',
    srcJS:   './source/frontend/js/',
    srcCSS:  './source/frontend/css/',
    tmp:     './tmp/frontend/',
    tmpJS:   './tmp/frontend/js/',
    tmpCSS:  './tmp/frontend/css/',
    dist:    './dist/frontend/',
    distJS:  './dist/frontend/js/',
    distCSS: './dist/frontend/css/',
    test:    './test/'
};

var backendDirs = {
    src:     './source/backend/',
    tmp:     './tmp/backend/',
    dist:    './dist/backend/',
    test:    './test/'
};

// Transpile ES6 and React Components and
// resolves dependencies with browserify
gulp.task('transpile-js', function() {
    return browserify({
        entries:    (frontendDirs.srcJS + 'app.js'),
        extensions: ['.jsx', '.js'],
        debug:      true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest(frontendDirs.tmpJS))
    .pipe(plugins.livereload())
});

gulp.task('serve-backend', function() {
    if (node) node.kill()
    node = spawn('node', [backendDirs.tmp + 'app.js'], {stdio: 'inherit'})
    node.on('close', function (code) {
        if (code === 8) {
            console.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task('transpile-backend', function() {
    return gulp.src(backendDirs.src + 'app.js')
        .pipe(plugins.plumber())
        .pipe(plugins.babel())
        .pipe(gulp.dest(backendDirs.tmp))
});


// Reload the HTML
gulp.task('transpile-html', function() {
    return gulp.src('source/**/*.html')
        .pipe(plugins.livereload());
});

gulp.task('transpile-css', function () {
    return gulp.src(frontendDirs.srcCSS + '*.less')
        .pipe(plugins.less())
        .pipe(gulp.dest(frontendDirs.tmpCSS))
        .pipe(plugins.livereload());
});

gulp.task('test', function () {
    return gulp.src(frontendDirs.test + 'test.js')
        .pipe(plugins.mocha({reporter: 'nyan'}))
        .pipe(plugins.livereload());
});

gulp.task('watch', function () {
    plugins.livereload.listen();
    plugins.connect.server({
        root: [frontendDirs.tmp, frontendDirs.src],
        port:       8080,
        livereload: true
    });

    gulp.src(frontendDirs.src + 'index.html')
        .pipe(plugins.open('', { url: 'http://localhost:8080' }));

    gulp.watch(frontendDirs.src + '/**/*.js',   ['transpile-js']);
    gulp.watch(frontendDirs.src + 'source/**/*.html', ['transpile-html']);
    gulp.watch(frontendDirs.src + 'source/**/*.less', ['transpile-css']);
});

gulp.task('watch-backend', function() {
    gulp.watch(backendDirs.src + '/**/*.js',   ['transpile-backend']);
    gulp.watch(backendDirs.tmp + 'app.js',   ['serve-backend']);
});

gulp.task('frontend', ['transpile-js', 'transpile-css', 'transpile-html', 'watch']);
gulp.task('backend',  ['transpile-backend', 'serve-backend', 'watch-backend']);

gulp.task('default',   ['backend', 'frontend']);


gulp.task('watch-tests', function() {
    gulp.watch([
            frontendDirs.src + '**/*.js',
            frontendDirs.src + 'source/**/*.jsx',
            frontendDirs.src + 'test/**/*.js'
        ],
        ['test']
    );
});