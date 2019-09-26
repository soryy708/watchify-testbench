const gulp = require('gulp');
const watchify = require('watchify');
const browserify = require('browserify');
const vinylSource = require('vinyl-source-stream');
const vinylBuffer = require('vinyl-buffer');
function createBundler() {
    return browserify({
        entries: ['./src.js'],
    }).plugin(watchify);
}
function bundle(bundler) {
    return bundler.bundle()
        .pipe(vinylSource('dst.js'))
        .pipe(vinylBuffer())
        .pipe(gulp.dest('./'))
        .on('error', console.error)
        .on('end', () => { console.log('Done'); });
}
gulp.task('default', () => {
    return bundle(createBundler());
});