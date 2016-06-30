var gulp = require('gulp');
var sass = require('gulp-sass');


var config = {
    bootstrapDir: 'bower_components',
    publicDir: 'dist',
};

gulp.task('styles', function() {
    return gulp.src('src/app.css')
    .pipe(sass({
        includePaths: [config.bootstrapDir + '/bootstrap/scss'],
    }))
    .pipe(gulp.dest(config.publicDir + '/styles'));
});

gulp.task('fonts', function() {
    return gulp.src(config.bootstrapDir + 'bootstrap-sass/assets/fonts/**/*')
    .pipe(gulp.dest(config.publicDir + '/fonts'));
});

gulp.task('default', ['styles', 'fonts']);