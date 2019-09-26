const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const ncp = require('ncp').ncp;
const versions = require('./versions');

function copyFolderRecursive(source, target) {
    return new Promise((resolve, reject) => {
        ncp(source, target, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    })
}

function prepareVersionBench(version) {
    return copyFolderRecursive('base', path.join('benches', version)).then(() => {
        return new Promise((resolve, reject) => {
            resolve(version);
        });
    });
}

exec ('cd base && npm i && cd ..', (err, stdout, stderr) => {
    if(err) {
        console.log('Failed to "npm install" in base');
        console.log(stderr);
        console.log(stdout);
        return;
    }

    if (!fs.existsSync('benches')) {
        console.log('No "benches" directory found. Creating . . .');
        fs.mkdirSync('benches');
        console.log('Created "benches" directory.');
    }

    console.log('Will prepare for testing the following versions: ', versions.join(', '));
    console.log('Recursively copying "base" to "benches/{version}" . . .');
    const copyDirPromises = versions.map(version => prepareVersionBench(version));
    Promise.all(copyDirPromises)
        .then(() => {
            console.log('Done copying directories');
        })
        .catch(err => {
            console.log('Failure copying directories');
            console.log(err);
        });
    
    const npmInstallPromises = copyDirPromises.map(promise => promise.then((version) => new Promise((resolve, reject) => {
        console.log(`Installing "watchify@${version}" in "benches/${version}"`);
        exec(`cd benches/${version} && npm i watchify@${version} && cd ../../`, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    })));
    Promise.all(npmInstallPromises)
        .then(() => {
            console.log('All Done');
        })
        .catch(err => {
            console.log('Failure');
            console.log(err);
        });
});
