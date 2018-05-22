'use strict';

var gulp = require('gulp'),
    inject = require('gulp-inject'),
    sort = require('gulp-sort'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass');

var paths = {
    webroot: "./",
    index: 'index.html',

    getWebrootUrl: function (url) {
        return this.webroot + url;
    }
};

gulp.task('index', function () {    

    return gulp.src(paths.getWebrootUrl(paths.index))
        .pipe(inject(gulp.src([
            paths.getWebrootUrl('assets/libs/jQuery/jQuery.js'),
            paths.getWebrootUrl('assets/libs/angularjs/angular.min.js'),
            paths.getWebrootUrl('assets/libs/**/*.js'),
            paths.getWebrootUrl('assets/**/*.js'),
            paths.getWebrootUrl('app/**/*.js'),
            '!' + paths.getWebrootUrl('**/gulpfile.js')
        ], { read: false }), {
                transform: function (filepath, file, i, length) {

                    var preventCache = filepath.endsWith('.html') || filepath.endsWith('.js') || filepath.endsWith('.css');
                    var isIsoFile = filepath.endsWith('.iso.js');

                    if (preventCache) {
                        filepath += '?v=' + (new Date()).getTime();
                    }

                    if (isIsoFile) {
                        return '<script src="' + filepath + '" charset="iso-8859-1"></script>';
                    } else {
                        return '<script src="' + filepath + '"></script>';
                    }
                },
                relative: true
            }))
        .pipe(inject(
            gulp.src([
                paths.getWebrootUrl('assets/**/*.css')
            ], { read: false })
                .pipe(sort({ asc: true })), {
                            relative: true,
                            transform: function (filepath, file, i, length) {
                                var preventCache = filepath.endsWith('.html') || filepath.endsWith('.js') || filepath.endsWith('.css');

                                if (preventCache) {
                                    filepath += '?v=' + (new Date()).getTime();
                                }

                                return '<link rel="stylesheet" href="' + filepath + '">';
                            }
            }))
        .pipe(gulp.dest(paths.getWebrootUrl('')));
});

gulp.task('sass', function () {
    return gulp.src([
        paths.getWebrootUrl('assets/css/*.scss'),
        '!' + paths.getWebrootUrl('assets/css/variables.scss')
    ])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(function (file) {
            var split = file.path.split("/");
            var fileFolder = split.slice(0, split.length - 1).join("/");
            return fileFolder;
        }));
});

gulp.task('sass:watch', function () {
    gulp.watch([paths.getWebrootUrl('core/content/css/*.scss'), paths.getWebrootUrl('content/css/*.scss')], ['sass']);
});