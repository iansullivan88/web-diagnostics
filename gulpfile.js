var gulp = require('gulp'),
    concat = require('gulp-concat'),
    install = require('gulp-install'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpMerge = require('gulp-merge');


// Dependencies
gulp.task('install', function() {
    return gulp.src(['./bower.json'])
        .pipe(install());
});

// Chrome App files

gulp.task('chrome', function() {
    return gulp.src('chrome/**')
        .pipe(gulp.dest('dist'));
});

// Files relating to app itself

gulp.task('static', function() {
    return gulp.src(['app/**/*.html'], {base: 'app/'})
        .pipe(gulp.dest('dist/app'));
});

gulp.task('scripts', function() {
    return gulp.src([
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'app/scripts/app.js',
            'app/scripts/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/app/scripts'));
});

gulp.task('styles', function() {
    var sassStream = gulp.src('./app/styles/*.scss')
        .pipe(sass({
            includePaths: ['bower_components/foundation/scss']
        }));

    var cssStream = gulp.src([
        'bower_components/angular/angular-csp.css'
    ]);

    return gulpMerge(sassStream, cssStream)
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist/app/styles'))
})

gulp.task('watch', function() {
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/**/*.html', ['static']);
});



gulp.task('default', ['install', 'chrome', 'static', 'styles', 'scripts']);
