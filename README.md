This project attempts to reproduce [a bug in watchify](https://github.com/browserify/watchify/issues/368) in various versions.

How to run?

1. `npm install`
2. `npm start`

What `npm start` does in this case is the following:

1. `cd base`
2. `npm install`
3. `cd ..`
4. `node prepare`
5. `npm test`
