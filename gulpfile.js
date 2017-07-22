var gulp = require("gulp");
var htmlmin = require("gulp-htmlmin");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var less = require("gulp-less");
var minifyCSS = require("gulp-csso");
var autoprefixer = require("gulp-autoprefixer");

gulp.task("html", function() {
	return gulp.src("src/*.html")
		.pipe(htmlmin({
			removeComments: true,
			collapseWhitespace: true
		}))
		.pipe(gulp.dest("build"))
});

gulp.task("js", function() {
	return gulp.src(["src/*.min.js", "src/*.js"])
		.pipe(concat("scripts.js"))
		.pipe(uglify({
			compress: {
				collapse_vars: true,
				reduce_vars: true,
				pure_getters: true
			}
		}))
		.pipe(gulp.dest("build"))
});

gulp.task("css", function() {
	return gulp.src("src/*.less")
		.pipe(less())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(minifyCSS())
		.pipe(gulp.dest("build"))
});

gulp.task("default", [ "html", "js", "css" ]);
