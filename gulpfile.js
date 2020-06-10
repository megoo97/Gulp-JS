const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify =require('gulp-uglify');
const sass =require('gulp-sass');
const concat = require('gulp-concat');
/*
-- TOP Level FUNCTIONS --
gulp.task - Define tasks
gulp.src  - point tofiles to use
gulp.dest - points to folder to output
gulp.watch - watch files and folders for changes

*/


// Logs Message 
gulp.task('message',() => {
    console.log("gulp is running");
})
// copy all html files 
gulp.task("copyHtml",() => {
    gulp.src('src/*.html').pipe(gulp.dest('dist'));
})

// optimize Images
gulp.task("imageMin",() => {
    gulp.src('src/images/*').pipe(imagemin()).pipe(gulp.dest('dist/images'));
})

// minify js files
gulp.task('minify',() => {
    gulp.src('src/js/*.js').pipe(uglify()).pipe(gulp.dest('dist/js'));
})

// compile sass
gulp.task('sass',() => {
    gulp.src('src/sass/*.scss').pipe(sass().on('error',sass.logError)).pipe(gulp.dest('dist/css'));
});

// scripts

gulp.task('scripts', () => {
    gulp.src('src/js/*.js').pipe(concat('main.js')).pipe(uglify()).pipe(gulp.dest('dist/js'));
})

gulp.task('default',gulp.parallel('message','copyHtml','imageMin','sass','scripts'));

gulp.task('watch' ,() => {
    gulp.watch('src/js/*.js',gulp.series('scripts'));
    gulp.watch('src/images/*',gulp.series('imageMin'));
    gulp.watch('src/sass/*.scss',gulp.series('sass'));
    gulp.watch('src/*.html',gulp.series('copyHtml'));
})
