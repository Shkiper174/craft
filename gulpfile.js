var gulp = require('gulp');
var server = require('gulp-server-livereload');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var bourbon = require('node-bourbon');
var neat = require ('node-neat').includePaths;

//server
gulp.task('start', function(){
 	gulp.src('app')
	 	.pipe(server({
	 	livereload : true,
	 	open: true	
 	}));
});

//styles


gulp.task('style', function(){
	return gulp.src('app/sass/**/*.scss')
		.pipe(sass({
        includePaths: bourbone.includePaths
    }).on('error', sass.logError))
		.pipe(prefix({
			browsers: ['last 15 versions']
		}))
		.pipe(gulp.dest('app/css'));

});

gulp.task('styles', function () {
    return gulp.src('app/sass/**/*.scss')
        .pipe(sass({
            includePaths: ['styles'].concat(neat)
        }))
        .pipe(gulp.dest('app/css'));
});


gulp.task('build', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', csso()))
        .pipe(gulp.dest('public'));
});

gulp.task('watch', function(){
	gulp.watch('app/sass/**/*.scss', ['styles']);
});

gulp.task('default', ['start','watch']);

