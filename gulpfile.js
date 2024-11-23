import gulp from "gulp";
import browserSync from "browser-sync";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
import postcss from "gulp-postcss";
import cssnano from "cssnano";
import autoPrefixer from "gulp-autoprefixer";
import rename from "gulp-rename";
import { deleteAsync } from "del";

const path = {
  build: {
    css: "assets/css/",
  },
  src: {
    html: "*.html",
    scss: `assets/scss/**/*.scss`,
    js: "assets/js/app.js",
    fonts: "assets/fonts/*.*",
    img: "assets/img/*.*",
  },
  watch: {
    html: "*.html",
    css: "assets/css/*.css",
    scss: `assets/scss/**/*.scss`,
    js: "assets/js/**/*.js",
    fonts: "assets/fonts/**/*.*",
    img: "assets/img/**/*.*",
  },
};

// Tasks
//Reset
const reset = () => {
  return deleteAsync(["assets/css/"]);
};

// Compile SCSS
const scss = () => {
  return gulp
    .src(path.src.scss, { sourcemaps: true })
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", sass.logError),
    )
    .pipe(
      autoPrefixer({
        grid: true,
      }),
    )
    .pipe(postcss([cssnano()]))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.stream());
};

// Local Server
const server = (done) => {
  browserSync.init({
    server: { baseDir: "./" },
    port: 3000,
    notify: false, // Отключаем уведомления
    open: true, // Автоматически открывать браузер
    cors: true,
    ui: false,
  });
  done();
};

// Reload Server
const reload = (done) => {
  browserSync.reload();
  done();
};

// Watcher
const watcher = () => {
  // Watch SCSS
  gulp.watch(path.watch.scss, scss);

  // Watch HTML and reload on changes
  gulp.watch(path.watch.html).on("change", browserSync.reload);

  // Watch CSS and reload on changes
  gulp.watch(path.watch.css).on("change", browserSync.reload);

  // Watch JS and reload on changes
  gulp.watch(path.watch.js).on("change", browserSync.reload);

  // Watch fonts and reload on changes
  gulp.watch(path.watch.fonts).on("change", browserSync.reload);

  // Watch images and reload on changes
  gulp.watch(path.watch.img).on("change", browserSync.reload);
};

// Main Tasks
const dev = gulp.series(reset, scss, gulp.parallel(watcher, server));
const build = gulp.series(reset, scss);

gulp.task("default", dev);
gulp.task("build", build);
