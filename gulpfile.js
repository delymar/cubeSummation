var gulp = require('gulp');
var clear = require('del');
var path = require('path');
var less = require('gulp-less');
var open = require('gulp-open');
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var annotate = require('gulp-ng-annotate')
var minifycss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var awspublish = require('gulp-awspublish');
var parallelize = require("concurrent-transform");
var livereload = require('gulp-livereload');

// App Files
var appScripts = [
  'app/app.module.js',
  'app/app.constants.js',
  'app/app.config.js',
  'app/app.routes.js',
  'app/app.run.js',
  'app/**/**.js',
  'app/**/**/**.js',
];

var appStyles = [
  'app/**.less'
];

var appViews = [
  'app/**/**.html'
];


var appImages = [
  'assets/images/**'
];
var appFonts = [
  'assets/fonts/**'
];
var appTemplates = [
  'app/**/**/**.html'
];

var BaseVendors = 'bower_components/';
// Vendor Files
var vendorScripts = [
  BaseVendors + 'jquery/dist/jquery.min.js',
  BaseVendors + 'bootstrap/dist/js/bootstrap.min.js',
  BaseVendors + 'lodash/lodash.min.js',
  BaseVendors + 'angular/angular.min.js',
  BaseVendors + 'angular-sanitize/angular-sanitize.min.js',
  BaseVendors + 'angular-cookies/angular-cookies.min.js',
  BaseVendors + 'angular-ui-router/release/angular-ui-router.min.js',
  BaseVendors + 'angular-animate/angular-animate.js',
  BaseVendors + 'angular-bootstrap/ui-bootstrap.min.js',
  BaseVendors + 'angular-bootstrap/ui-bootstrap-tpls.min.js',
  BaseVendors + 'bootstrap-sweetalert/dist/sweetalert.min.js',
  BaseVendors + 'angular-toastr/dist/angular-toastr.min.js',
  BaseVendors + 'async/dist/async.min.js'


];
var vendorStyles = [
  BaseVendors + 'angular-bootstrap/ui-bootstrap-csp.css',
  BaseVendors + 'bootstrap/dist/css/bootstrap.min.css',
  BaseVendors + 'font-awesome/css/font-awesome.min.css',
  BaseVendors + 'bootstrap-sweetalert/dist/sweetalert.css',
  BaseVendors + 'angular-toastr/dist/angular-toastr.min.css'

];
var vendorsFonts = [
  BaseVendors + 'font-awesome/fonts/fontawesome-webfont.woff',
  BaseVendors + 'font-awesome/fonts/fontawesome-webfont.ttf',
  BaseVendors + 'font-awesome/fonts/fontawesome-webfont.eot',
  BaseVendors + 'font-awesome/fonts/fontawesome-webfont.woff2'
];



// Start the server
gulp.task('server', ['default'], function() {
  connect.server({
    root: "www",
    port: 2000,
    host: '127.0.0.1',
    livereload: true
  });
});

// Clean
gulp.task('clean', function(cb) {
  clear(['www/', 'www/', 'www/'], cb);
});

// Scripts
gulp.task('scripts', function() {
  gulp.src(appScripts)
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(annotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('www/'))
    .pipe(livereload());
});

// Styles
gulp.task('styles', function() {
  gulp.src(appStyles)
  .pipe(less({
    paths: [ path.join(__dirname, 'less', 'includes') ]
  }))
  .pipe(concat('app.css'))
  .pipe(gulp.dest('www/'))
  .pipe(livereload());
});

// Images
gulp.task('images', function() {
  gulp.src(appImages)
    .pipe(gulp.dest('www/assets/images/'))
});

// Fonts
gulp.task('fonts', function() {
  gulp.src(appFonts)
    .pipe(gulp.dest('www/assets/fonts/'))
});

// Vendor
gulp.task('vendors', function() {
  gulp.src(vendorScripts)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('www/'))
  gulp.src(vendorStyles)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('www/'))
  gulp.src(vendorsFonts)
    .pipe(gulp.dest('www/fonts/'))
});

// Views
gulp.task('views', function() {
  gulp.src('index.html')
    .pipe(gulp.dest('www/'));
  gulp.src(appViews)
    .pipe(gulp.dest('www/app'))
    .pipe(livereload());
});

// Templates
gulp.task('templates', function() {
  gulp.src(appTemplates)
    .pipe(gulp.dest('www/app/'))
    .pipe(livereload());
});

// Default task
gulp.task('default', function() {
  gulp.start('scripts', 'vendors', 'views', 'styles', 'images', 'templates','fonts');
});


// Watch
gulp.task('watch', ['server'], function() {
 var appStyles2 = ['app/*.less','app/**/*.less','app/**/**/*.less'];
  // Watch app style and JS files
  gulp.watch(appScripts, ['scripts']);
  gulp.watch(appStyles2, ['styles']);
  gulp.watch(appTemplates, ['templates']);

  // Watch HTML files
  gulp.watch(['index.html', appViews], ['views']);

  // Watch any files in www/, reload on change
  watch("www/**").pipe(connect.reload());

});
