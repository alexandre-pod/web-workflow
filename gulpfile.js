/*jshint esversion: 6 */

// gulp module
const gulp = require('gulp');

// utilities
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const watch = require('gulp-watch');
const merge = require('gulp-merge');
const path = require('path');
const fs = require('fs');

const rimraf = require('rimraf');

// css
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');


// javascript
const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');

// html
const fileinclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const htmlhint = require('gulp-htmlhint');


const pagePath = 'page';
const cssFiles = path.join(pagePath, 'css', '*.css');
const jsFiles = path.join(pagePath, 'js', '*.js');
const templateFiles = path.join(pagePath, 'template', '*.html');
const indexFile = path.join(pagePath, 'index.html');
const othersRessources = [path.join(pagePath, '**', '*.*'), '!'+indexFile, '!'+cssFiles, '!'+jsFiles, '!'+templateFiles];

const destinationFolder = 'dist';

// JS
gulp.task('lint-js', () => {
	return gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});

gulp.task('build-js', ['lint-js'], () => {
	return gulp.src(jsFiles)
		.pipe(plumber())
		.pipe(concat('script.js'))
		.pipe(gulp.dest(destinationFolder))
		.pipe(uglify())
		.pipe(rename('script.min.js'))
		.pipe(gulp.dest(destinationFolder));
});

// CSS
gulp.task('build-css', () => {
	return gulp.src(cssFiles)
		.pipe(concat('style.css'))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest(destinationFolder))
		.pipe(cleanCSS())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest(destinationFolder));
	}
);

// HTML
gulp.task('lint-html', () => {
	return gulp.src(indexFile)
		.pipe(htmlhint())
		.pipe(htmlhint.failReporter());
});

gulp.task('build-html', ['lint-html'], function() {
  gulp.src(indexFile)
  	.pipe(plumber())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(htmlhint())
    .pipe(htmlhint.failReporter())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(destinationFolder));
});


// copy other ressources
gulp.task('other', () => {
	return gulp.src(othersRessources)
		.pipe(gulp.dest(destinationFolder));
});


gulp.task('watch-files', function() {
	// return merge(
		gulp.watch(cssFiles, ['build-css']);
		gulp.watch(jsFiles, ['build-js']);
		gulp.watch([templateFiles, indexFile], ['build-html']);
		gulp.watch(othersRessources, ['other']);
	// );
});

gulp.task('watch', ['build', 'watch-files']);

gulp.task('build', ['build-js', 'build-css', 'build-html', 'other']);

gulp.task('clean', (cb) => {
	rimraf(path.join('.', destinationFolder), cb);
});