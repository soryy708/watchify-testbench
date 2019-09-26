const assert = require('assert');
const exec = require('child_process').exec;
const versions = require('./versions');

const timeout = 10000;

versions.forEach(version => {
    it(version, (done) => {
        exec(`node ./node_modules/gulp/bin/gulp.js --gulpfile benches/${version}/gulpfile.js`, {timeout: timeout}, (err, stdout, stderr) => {
            assert.strictEqual(err.killed, false, `Process froze and was killed after ${timeout}ms`);
            done();
        });
    });
});
