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
        scss: `assets/scss/**/*.scss`,
    },
    watch: {
        scss: `assets/scss/**/*.scss`,
    },
};

// Tasks
//Reset
const reset = () => {
    return deleteAsync(['assets/css/']);
};

// Compile SCSS
const scss = () => {
    return gulp
        .src(path.src.scss, { sourcemaps: true })
        .pipe(
            sass({
                outputStyle: "expanded",
            }).on('error', sass.logError)
        )
        .pipe(
            autoPrefixer({
                grid: true,
            })
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
    });
    done();
};

// Watcher
const watcher = () => {
    gulp.watch(path.watch.scss, scss);
};

// Main Tasks
const dev = gulp.series(reset, scss, gulp.parallel(watcher, server));
const build = gulp.series(reset, scss);

gulp.task("default", dev);
gulp.task("build", build);