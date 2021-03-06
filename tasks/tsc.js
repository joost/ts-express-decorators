const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const replace = require('gulp-replace');

const tsProject = ts.createProject('./tsconfig.compile.json', {
  'declaration': true,
  'noResolve': false,
  'preserveConstEnums': true
});
const version = require('../package.json').version;

module.exports = (gulp, cb) =>
  tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .once('error', function () {
      this.once('finish', () => {
        cb('Failed with errors');
      });
    })
    .pipe(sourcemaps.write('.', { sourceRoot: './' }))
    .pipe(replace('0.0.0-PLACEHOLDER', version))
    .pipe(gulp.dest('./dist/lib'));
