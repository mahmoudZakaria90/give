var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer')
var connect = require('gulp-connect');
var csso = require('gulp-csso');

//sass-en
gulp.task('sass', function () {
   sass('./src/sass/*.sass',{style:'expanded'})
    .on('error', sass.logError)
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/css'))
    .pipe(connect.reload())
});



//watch 
gulp.task('watch',function(){
	gulp.watch('./src/sass/*.sass',['sass'])
	gulp.watch('./public/**/*.html',['html'])
})


//html live reload
gulp.task('html', function() {
	gulp.src('./public/**/*.html')
		.pipe(connect.reload());

})

gulp.task('server',function(){
	connect.server({
		root: 'public',
		livereload: true
	})
})

//css minify
gulp.task('mini-css', function () {
    return gulp.src('./public/css/*.css')
        .pipe(csso())
        .pipe(gulp.dest('./public/css/'));
});


//default
gulp.task('default',['watch','server','sass','mini-css'])