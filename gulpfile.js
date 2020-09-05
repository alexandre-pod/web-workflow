/*jshint esversion: 6 */

// gulp module
const gulp = require('gulp');

// utilities
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const path = require('path');
const rimraf = require('rimraf');

// css
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');


// javascript
const eslint = require('gulp-eslint');
const terser = require('gulp-terser');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

// html
const fileinclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const htmlhint = require('gulp-htmlhint');


var browserSync = require('browser-sync').create();

// Constants
const pagePath = 'page';
const cssFiles = path.join(pagePath, 'css', '**', '*.css');
const jsFiles = path.join(pagePath, 'js', '**', '*.js');
const templateFiles = path.join(pagePath, 'template', '**', '*.html');
const indexFile = path.join(pagePath, 'index.html');
const othersRessources = [path.join(pagePath, '**', '*.*'), '!'+indexFile, '!'+cssFiles, '!'+jsFiles, '!'+templateFiles];

const destinationFolder = 'dist';

// JS
gulp.task('lint-js', () => {
	return gulp.src(jsFiles)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('build-js', gulp.series('lint-js', () => {
	return gulp.src(jsFiles)
		.pipe(plumber())
		.pipe(concat('script.js'))
		.pipe(babel())
		.pipe(gulp.dest(destinationFolder))
		.pipe(sourcemaps.init())
		.pipe(terser())
		.pipe(rename('script.min.js'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(destinationFolder));
}));

// CSS
gulp.task('build-css', () => {
	return gulp.src(cssFiles)
		.pipe(concat('style.css'))
		.pipe(autoprefixer({cascade: false}))
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

gulp.task('build-html', gulp.series('lint-html', () => {
	return gulp.src(indexFile)
		.pipe(plumber())
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(htmlhint())
		.pipe(htmlhint.failReporter())
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(gulp.dest(destinationFolder));
}));


// copy other ressources
gulp.task('other', () => {
	return gulp.src(othersRessources)
		.pipe(gulp.dest(destinationFolder));
});


gulp.task('watch-files', (done) => {
	gulp.watch(cssFiles, gulp.series('build-css'));
	gulp.watch(jsFiles, gulp.series('build-js'));
	gulp.watch([templateFiles, indexFile], gulp.series('build-html'));
	gulp.watch(othersRessources, gulp.series('other'));
	done();
});

gulp.task('browser-sync', () => {
	browserSync.init({
		server: {
			baseDir: "./dist"
		}
	});
	gulp.watch("dist/*").on('change', browserSync.reload);
});

gulp.task('build', gulp.series('build-js', 'build-css', 'build-html', 'other'));

gulp.task('watch', gulp.series('build', 'watch-files'));

gulp.task('serve', gulp.series('watch', 'browser-sync'));

gulp.task('clean', (cb) => {
	rimraf(path.join('.', destinationFolder), cb);
});
