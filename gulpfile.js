var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var jshint = require('gulp-jshint');
var notificator = require('gulp-jshint-notify-reporter');
var csso = require('gulp-csso');

//sass-en
gulp.task('sass', function () {
   sass('./src/sass/en/*.sass',{style:'expanded'})
    .on('error', sass.logError)
    .pipe(connect.reload())
    .pipe(gulp.dest('./public/css'));
});

//sass-ar
gulp.task('sass-ar', function () {   
   sass('./src/sass/ar/*.sass',{style:'expanded'})
    .on('error', sass.logError)
    .pipe(connect.reload())
    .pipe(gulp.dest('./public/css'));
});

//watch 
gulp.task('watch',function(){
	gulp.watch('./src/sass/en/*.sass',['sass'])
 	gulp.watch('./src/sass/ar/*.sass',['sass-ar'])
	gulp.watch('./public/**/*.html',['html'])
	gulp.watch('./src/js/script.js',['browserify'])
    gulp.watch('./src/js/**.js',['lint'])
})


//html live reload
gulp.task('html', function() {
	gulp.src('./public/**/*.html')
		.pipe(connect.reload());

})

//Browserify
gulp.task('browserify', function() {
    return browserify('./src/js/script.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('script.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./public/js/'))
        .pipe(connect.reload());
});

//Js lint
gulp.task('lint', function() {
  return gulp.src('./src/js/*.js')
    .pipe(jshint())
    .pipe(notificator())
});

//Localhost 
gulp.task('server',function(){
	connect.server({
		root: 'public',
		livereload: true
	})
})


//css minify
gulp.task('csso', function () {
    return gulp.src('./public/css/*.css')
        .pipe(csso())
        .pipe(gulp.dest('./public/css/'));
});
//default
gulp.task('default',['watch','server','browserify','sass','sass-ar','csso'])