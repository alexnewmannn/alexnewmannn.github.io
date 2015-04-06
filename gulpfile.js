// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var sass = require('gulp-sass');
var express = require('express');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

gulp.task('start', function() {
    var app = express();
    app.use(express.static(__dirname));
    app.listen(4000);
});

// First we compile our LESS
gulp.task('less', function() {
    return gulp.src('Styles/style.less')
    .pipe(less({
    	compress: true
    }))
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
    gulp.src('./Styles/scss/site.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            onError: function(err) {
                return notify().write(err);
            }
        }))
        // .on('error', notify.onError('Error: <%= error.message %>'))
        .pipe(gulp.dest('./Styles/css'))
		.pipe(livereload({start: true}));
});

// Prefix dist CSS
gulp.task('prefix', function () {
    return gulp.src('./Styles/css/site.css')
    .pipe(autoprefixer({
        browsers: ['last 20 versions', 'ie 9'],
        cascade: false
    }))
    .pipe(gulp.dest('./Styles/css'));
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('/js/src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('/js/src/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('/js/dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('/js/dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(['./Styles/scss/*/*.scss', './Styles/scss/*.scss'], ['sass']);
    gulp.watch('./Styles/css/site.css', ['prefix']);
    gulp.watch('/js/src/*.js', ['lint', 'scripts']);
    gulp.watch('./index.html', ['livereload']);
});

gulp.task('livereload', function() {
	return gulp.src('./index.html')
	.pipe(livereload({start: true}));
});

// Default Task
gulp.task('default', ['lint', 'sass', 'prefix', 'scripts', 'watch']);