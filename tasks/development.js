var gulp        = require('gulp');
var browserify  = require('browserify');
var watchify    = require('watchify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var plugins     = require('gulp-load-plugins')();
var buffer      = require('vinyl-buffer');

var spawn = require('child_process').spawn;
var node;

var backendDirs  = require('./config.js').backendDirs;
var frontendDirs = require('./config.js').frontendDirs;



// Transpile ES6 and React Components and
// resolves dependencies with browserify
gulp.task('transpile-frontend-js', function() {
    return browserify({
        entries:    (frontendDirs.srcJS + 'app.js'),
        extensions: ['.jsx', '.js'],
        debug:      true,
        insertGlobals : true
    })
        .transform(babelify, { stage: 0 })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(plugins.uglify())
        .pipe(gulp.dest(frontendDirs.tmpJS))
        .pipe(plugins.livereload())
});

// Transpile Backend ES6 Modules
// to ES5 Modules
gulp.task('transpile-backend-js', function() {
    return gulp.src(backendDirs.src + '/**/*.js')
        .pipe(plugins.plumber())
        .pipe(plugins.babel())
        .pipe(gulp.dest(backendDirs.tmp))
});

// Transpile LESS to CSS
// automatically adds prefixes
// and minifies css
gulp.task('transpile-frontend-css', function () {
    return gulp.src(frontendDirs.srcCSS + 'main.less')
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(plugins.minifyCss({keepBreaks: false}))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(frontendDirs.tmpCSS))
        .pipe(plugins.livereload());
});

gulp.task('transpile-frontend-html', function() {
    return gulp.src('source/**/*.html')
        .pipe(plugins.livereload());
});

gulp.task('transpile-frontend', [
    'transpile-frontend-js',
    'transpile-frontend-css',
    'transpile-frontend-html'
]);

gulp.task('serve-backend', ['transpile-backend'], function() {
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

gulp.task('open-browser', function() {
    gulp.src(frontendDirs.src + 'index.html')
        .pipe(plugins.open('', { url: 'http://localhost:8080' }));
});

gulp.task('serve-frontend', ['transpile-frontend', 'open-browser'], function() {
    plugins.livereload.listen();
    plugins.connect.server({
        root:       [frontendDirs.tmp, frontendDirs.src],
        port:       8080,
        livereload: true
    });

    gulp.watch(frontendDirs.srcJS  + '/**/*.js',   ['transpile-frontend-js']);
    gulp.watch(frontendDirs.src    + '/**/*.html', ['transpile-html']);
    gulp.watch(frontendDirs.srcCSS + '/**/*.less', ['transpile-frontend-css']);
});


