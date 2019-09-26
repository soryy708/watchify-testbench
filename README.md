This project attempts to reproduce [a bug in watchify](https://github.com/browserify/watchify/issues/368) in various versions.

# How to run?

* `npm install`
* `npm start`

# What `npm start` does in this case is the following:

* `cd base`
* `npm install`
* `cd ..`
* `mkdir benches`
* For each version in [versions.js](https://github.com/soryy708/watchify-testbench/blob/master/versions.js):
    * `cp "base" "benches/{version}"`
    * `cd benches/{version}`
    * `npm install watchify@{version}`
    * `cd ../../`
* `npm test`

# What `npm test` does in this case is the following:

* For each version in [versions.js](https://github.com/soryy708/watchify-testbench/blob/master/versions.js):
    * Execute the `gulpfile.js`
    * Wait for it to fail (timeout configurable in [test.js](https://github.com/soryy708/watchify-testbench/blob/master/test.js))
    * If failed due to kill signal (meaning the process froze), fail the test. Else, pass.

# This project assumes Windows operating system.
