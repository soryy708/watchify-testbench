This project attempts to reproduce [a bug in watchify](https://github.com/browserify/watchify/issues/368) in various versions.

# How to run?

1. `npm install`
2. `npm start`

# What `npm start` does in this case is the following:

1. `cd base`
2. `npm install`
3. `cd ..`
4. `mkdir benches`
5. For each version in [versions.js](https://github.com/soryy708/watchify-testbench/blob/master/versions.js):
5.1. `cp "base" "benches/{version}"`
5.2 `cd benches/{version}`
5.3 `npm install watchify@{version}`
5.4 `cd ../../`
6. `npm test`

# What `npm test` does in this case is the following:

1. For each version in [versions.js](https://github.com/soryy708/watchify-testbench/blob/master/versions.js):
1.1. Execute the `gulpfile.js`
1.2. Wait for it to fail (timeout configurable in [test.js](https://github.com/soryy708/watchify-testbench/blob/master/test.js))
1.3. If failed due to kill signal (meaning the process froze), fail the test. Else, pass.

# This project assumes Windows operating system.
