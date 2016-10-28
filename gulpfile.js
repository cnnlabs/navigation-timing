'use strict';

const gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    fs = require('fs'),
    gutil = require('gulp-util'),
    jscs = require('gulp-jscs'),
    minify = require('gulp-minify'),
    pkg = require('./package.json');

gulp.task('dist', function (callback) {
    
    /* bundles that are hosted */
    gulp.src('src/navigation-timing.js')
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest('dist'));

    callback();
});

/* linting */
gulp.task('lint', function () {
    const src = ['./src/**/*.js'];

    function linting () {
        gulp.src(src)
            .pipe(jscs())
            .pipe(jscs.reporter())
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failOnError())
            .on('error', (error) => {});

    }
    return linting();
});

/* Test */
gulp.task('test', ['lint']);

/* Build */
gulp.task('build', ['test', 'dist']);

/* Default Task */
gulp.task('default', ['test']);
