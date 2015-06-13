module.exports = {
    testDirs: {
        test:    './test/**/*.js',
        testSrc: './source/**/*.js',
        testDst: './tmp/test/'
    },
    frontendDirs: {
        src:     './source/frontend/',
        srcJS:   './source/frontend/js/',
        srcCSS:  './source/frontend/css/',
        tmp:     './tmp/frontend/',
        tmpJS:   './tmp/frontend/js/',
        tmpCSS:  './tmp/frontend/css/',
        dist:    './dist/frontend/',
        distJS:  './dist/frontend/js/',
        distCSS: './dist/frontend/css/',
        testJS:  './tmp/test/frontend'
    },
    backendDirs: {
        src:    './source/backend/js/',
        tmp:    './tmp/backend/js/',
        dist:   './dist/backend/'
    }
};