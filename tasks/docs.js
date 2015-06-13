var gulp     = require('gulp');
var plugins  = require('gulp-load-plugins')();
var dirs     = require('./config');


gulp.task('doc', function() {
    return gulp.src([
        dirs.frontendDirs.srcJS + '/**/*.js',
        dirs.backendDirs.src + '/**/*.js'
    ])
        .pipe(plugins.docco())
        .pipe(gulp.dest('./documentation'))
});
