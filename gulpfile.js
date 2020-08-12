const { src, dest } = require("gulp");
const minify = require("gulp-minify");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const concatCss = require("gulp-concat-css");

async function minifyjs() {
  return src(
    [
      "js/controller.js",
      "js/helpers.js",
      "js/model.js",
      "js/store.js",
      "js/template.js",
      "js/view.js",
      "js/app.js",
      "node_modules/todomvc-common/*.js",
    ],
    { allowEmpty: true }
  )
    .pipe(minify({ noSource: true }))
    .pipe(concat("all.js"))
    .pipe(dest("public/js"));
}

async function cleancss() {
  return src(
    ["node_modules/todomvc-common/*.css", "node_modules/todomvc-app-css/*.css"],
    { allowEmpty: true }
  )
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(concatCss("css/all.css"))
    .pipe(dest("public/"));
}

async function all() {
  await minifyjs();
  await cleancss();
}

exports.default = all;
