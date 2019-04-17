const readFile = require('../read-configuration-files/script');
const cp = require('child_process');

var downloadGit = (name) => {
    readFile.readJsonFile("libraries-github", (data) => {
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (key == name) {
                    console.log(`Downloading... from ${data[key]}`);
                    getGithubInformation(data[key]);
                    break;
                }        
            }
        }
    });
}

var getGithubInformation = (url) => {
    cp.exec(`git clone ${url}`, (err) =>{
        if (err) {
            console.log("Please make sure you have a git cmd client installed on your device!");
        }
    });
};

module.exports = {
    downloadGit
}