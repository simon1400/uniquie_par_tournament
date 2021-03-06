var gulp = require("gulp");
var concat = require("gulp-concat");
var babel = require("gulp-babel");
var browserSync = require("browser-sync").create();
var htmlreplace = require("gulp-html-replace");
var uglify = require("gulp-uglify");
var cleanCSS = require("gulp-clean-css");

gulp.task("build-js", ["compile-js"], function() {
  return gulp
    .src([
      "./node_modules/vue/dist/vue.js",
      "./node_modules/jquery/dist/jquery.slim.js",
      "./node_modules/popper.js/dist/umd/popper.js",
      "./node_modules/bootstrap/dist/js/bootstrap.js",
      "./node_modules/file-saver/FileSaver.js",
      "./build/app.js"
    ])
    .pipe(concat("bundle.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./build"));
});

gulp.task("build-css", function() {
  return gulp
    .src(["./node_modules/bootstrap/dist/css/bootstrap.css"])
    .pipe(concat("bundle.min.css"))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./build"));
});

gulp.task("build-html", function() {
  return gulp
    .src("./src/index.html")
    .pipe(
      htmlreplace({
        css: "./bundle.min.css",
        js: "./bundle.min.js"
      })
    )
    .pipe(gulp.dest("./build"));
});

gulp.task("compile-js", function() {
  return gulp
    .src("src/app.js")
    .pipe(
      babel({
        presets: ["env"]
      })
    )
    .pipe(gulp.dest("./build"));
});

gulp.task("serve-build", function() {
  browserSync.init({
    server: {
      baseDir: "./build/"
    },
    ui: false,
    open: false,
    files: "src/app.js"
  });

  gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("serve", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    ui: false,
    open: false,
    files: "src/app.js",
    startPath: "src"
  });

  gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("build-sw", function(callback) {
  var swPrecache = require("sw-precache");
  var rootDir = "build";

  swPrecache.write(
    `${rootDir}/service-worker.js`,
    {
      staticFileGlobs: [
        rootDir + "/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}"
      ],
      stripPrefix: rootDir
    },
    callback
  );
});

gulp.task("build", ["build-html", "build-js", "build-css"]);
