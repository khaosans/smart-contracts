const fs = require('fs');
const path = require('path');
const mv = require('mv');

const oldArtifactsPath = path.join(__dirname, '.coverageArtifacts');
const targetArtifactPath = path.join(__dirname, '.coverage_artifacts');

function moveFiles(config) {
    fs.readdir(oldArtifactsPath, (err, files) => {
        if (err) console.log(err);
        files.forEach(file => {
            mv(path.join(oldArtifactsPath, file), path.join(targetArtifactPath, file), err => {
                if (err) throw err;
                console.log(`Moving ` + file);
            });
        })
    })
}

function removeArtifactsDir(config) {
    fs.rmdir(oldArtifactsPath, err => {
        if (err) console.log(err);
    })
}

module.exports = {
    providerOptions: {
        "default_balance_ether": 50000,
        "total_accounts": 20
    },
    istanbulReporter: ['html','json'],
    onCompileComplete: moveFiles,
    onIstanbulComplete: removeArtifactsDir
}
