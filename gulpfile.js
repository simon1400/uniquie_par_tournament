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
  gulp
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
  gulp
    .src("src/app.js")
    .pipe(
      babel({
        presets: ["env"]
      })
    )
    .pipe(gulp.dest("./build"));
});

gulp.task("serve", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
<<<<<<< HEAD
    ui: false,
    open: false,
    files: ['src/app.js']
=======
    startPath: "src",
    files: "src/app.js"
>>>>>>> 4b9352cef91fd9d3eb6e810d641693d0d6d8d3f4
  });

  gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("build", ["build-html", "build-js", "build-css"]);
