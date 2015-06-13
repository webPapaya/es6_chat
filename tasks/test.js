var gulp       = require('gulp');
var plugins    = require('gulp-load-plugins')();
var testDirs   = require('./config.js').testDirs;

gulp.task('prepare-test', function() {
    return gulp.src(testDirs.testSrc)
        .pipe(plugins.plumber())
        .pipe(plugins.babel({ stage: 0 }))
        .pipe(gulp.dest(testDirs.testDst))
});

gulp.task('test', ['prepare-test'], function() {
    return gulp.src(testDirs.test)
        .pipe(plugins.istanbul()) // Covering files
        .pipe(plugins.istanbul.hookRequire()) // Force `require` to return covered files
        .on('finish', function () {
            return gulp.src(testDirs.test, {read: false})
                .pipe(plugins.spawnMocha({reporter: 'spec'}))
                .pipe(plugins.istanbul.writeReports());
        });

});

gulp.task('watch-tests', ['test'], function() {
    gulp.watch([
        testDirs.testSrc,
        testDirs.test
    ], ['test']);
});