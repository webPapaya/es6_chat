"use strict";

var gulp        = require('gulp');
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var plugins     = require('gulp-load-plugins')();

var spawn = require('child_process').spawn;
var node;

var commonDirs = {
    test:    './test/'
}

var frontendDirs = {
    src:     './source/frontend/',
    srcJS:   './source/frontend/js/',
    srcCSS:  './source/frontend/css/',
    tmp:     './tmp/frontend/',
    tmpJS:   './tmp/frontend/js/',
    tmpCSS:  './tmp/frontend/css/',
    dist:    './dist/frontend/',
    distJS:  './dist/frontend/js/',
    distCSS: './dist/frontend/css/'
};

var backendDirs = {
    src:    './source/backend/js/',
    tmp:    './tmp/backend/js/',
    dist:   './dist/backend/'
};

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

// Transpile ES6 and React Components and
// resolves dependencies with browserify
gulp.task('transpile-js', function() {
    console.log('--running transpile-js--');
    return browserify({
        entries:    (frontendDirs.srcJS + 'app.js'),
        extensions: ['.jsx', '.js'],
        debug:      true
    })
    .transform(babelify, { stage: 0 })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest(frontendDirs.tmpJS))
    .pipe(plugins.livereload())
});

gulp.task('serve-backend', ['transpile-backend'], function() {
    console.log('--running serve-backend--');
    if(node) {
        return;
    }
    node = spawn('node', [backendDirs.tmp + '/app.js'], {stdio: 'inherit'});
    node.on('close', function (code) {
        if (code === 8) {
            console.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task('transpile-backend', function() {
    console.log('--running transpile-backend--');
    return gulp.src(backendDirs.src + '/**/*.js')
        .pipe(plugins.plumber())
        .pipe(plugins.babel())
        .pipe(gulp.dest(backendDirs.tmp))
});

// Reload the HTML
gulp.task('transpile-html', function() {
    console.log('--running transpile-html--');
    return gulp.src('source/**/*.html')
        .pipe(plugins.livereload());
});

gulp.task('transpile-css', function () {
    console.log('--running transpile-css--');
    return gulp.src(frontendDirs.srcCSS + '*.less')
        .pipe(plugins.less())
        .pipe(gulp.dest(frontendDirs.tmpCSS))
        .pipe(plugins.livereload());
});

gulp.task('test', function () {
    console.log('--running test--');
    return gulp.src(commonDirs.test + '**/*.js')
        .pipe(plugins.mocha({reporter: 'nyan'}))
        .on('error', handleError)
        .pipe(plugins.livereload());
});


//gulp.task('test-backend', function() {
//    console.log('--running test-backend--');
//   return gulp.src(backendDirs.tmp + 'spec/**/*.js')
//    .pipe(plugins.mocha({reporter: 'nyan'}));
//});

gulp.task('watch', function () {
    console.log('--running watch--');
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
    console.log('--running watch-backend--');
    gulp.watch(backendDirs.tmp + '**/*.js',   ['test']);
});

gulp.task('frontend', ['transpile-js', 'transpile-css', 'transpile-html', 'watch']);
gulp.task('backend',  ['serve-backend', 'watch-backend', 'watch-tests']);

gulp.task('default',   ['backend', 'frontend']);


gulp.task('watch-tests', function() {
    gulp.watch([
            frontendDirs.src + '**/*.js',
            frontendDirs.src + 'source/**/*.jsx',
            frontendDirs.src + 'test/**/*.js',
            commonDirs.test  + '**/*.js',
        ],
        ['test']
    );
});