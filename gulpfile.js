var gulp = require('gulp');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var when = require('when');
var jsyaml = require('js-yaml');
var fs = require('fs');

var concat = require('gulp-concat');
var minifyJS = require('gulp-uglify');
var deploy = require("gulp-gh-pages");
var static = require('node-static');

// // compile css
// gulp.task('stylus', function () {
//     return gulp.src('./css/[!_]*.styl')
//         .pipe(stylus({use: ['nib']}))
//         .pipe(gulp.dest('./out/css'))
// });

// copy over everything from the static folder (images, etc)
// NOTE: into the root of the out folder
// gulp.task('static', function(){
//     return gulp.src('./static/**')
//         .pipe(gulp.dest('./out'));
// });

gulp.task('scripts', function(){
    var tasks = [];

    tasks.push( 
        gulp.src([
            './js/stripe.js',
            './js/jquery.js',
            './js/jquery.typewatch.js',
            './js/jquery.payment.js',
            './js/main.js'
        ])
        .pipe(concat('event.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest('./out/'))
    )

    tasks.push(
        gulp.src('./js/**')
        .pipe(minifyJS())
        .pipe(gulp.dest('./out/'))
    )

    return when.all(tasks);
});

gulp.task('default', ['scripts']);

gulp.task('watch', function() {
    runServer();
    gulp.watch('./static/**', ['static']);
    gulp.watch('./css/*.styl', ['stylus']);
    gulp.watch('./scripts/**/*.js', ['scripts'])
    gulp.watch(['./*.jade', './components/*.jade', './info.yaml'], ['html']);
});

var file = new static.Server('./out');
function runServer(port) {
    require('http').createServer(function (request, response) {
        request.addListener('end', function () {
            file.serve(request, response);
        }).resume();
    }).listen(port || 8000);
}
gulp.task('deploy', ['scripts'], function () {
    var remote = "https://github.com/gopilot/philly.git";

    return gulp.src("./out/**/*")
        .pipe( deploy( remote ) );
});
