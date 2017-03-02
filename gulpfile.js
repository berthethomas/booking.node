var gulp = require('gulp');

gulp.task('default', function() {
	gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
	.pipe(gulp.dest('./public/css/'));

	gulp.src('./node_modules/font-awesome/css/font-awesome.min.css')
	.pipe(gulp.dest('./public/css/'));

	gulp.src('./node_modules/font-awesome/fonts/*')
	.pipe(gulp.dest('./public/fonts/'));

	gulp.src('./node_modules/jquery/dist/jquery.min.js')
	.pipe(gulp.dest('./public/js/'));

	gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
	.pipe(gulp.dest('./public/js/'));
});
