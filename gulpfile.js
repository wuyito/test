var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglifyjs');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');
var concat = require('gulp-concat');

var config = {
  bowerDir: 'bower_components',
  publicDir: 'dist',
};

gulp.task('fonts', function() {
  return gulp.src([
    config.bowerDir + '/font-awesome/fonts/**.*',
  ])
  .pipe(gulp.dest(config.publicDir + '/fonts'));
});

gulp.task('js', function() {
  return gulp.src([
    config.bowerDir + '/jquery/dist/jquery.js',
    config.bowerDir + '/bootstrap/dist/js/tether.js',    
    config.bowerDir + '/bootstrap/dist/js/bootstrap.js',
    config.bowerDir + '/filament-sticky/fixedsticky.js',   
    config.bowerDir + '/owl.carousel/dist/owl.carousel.js',
    'src/js/main.js',
  ])
  .pipe(uglify('app.js', {
    compress: false,
    outSourceMap: true,
  }))
  .pipe(gulp.dest(config.publicDir + '/js'));
});

gulp.task('css', function() {
  return gulp.src('src/css/app.css')
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'compressed',
    includePaths: [
        config.bowerDir + '/bootstrap/scss',
        config.bowerDir + '/font-awesome/scss',
        config.bowerDir + '/owl.carousel/src/scss',
    ],
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('vendors', function(){
  return gulp.src(mainBowerFiles())
    .pipe(filter('*.css'))
    .pipe(concat('vendors.css'))
    .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('default', ['css', 'js', 'fonts', 'vendors']);