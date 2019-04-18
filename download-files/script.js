const readFile = require('../read-configuration-files/script');
const cp = require('child_process');

var downloadFromGit = (name, fullPath) => {
    readFile.readJsonFile("libraries-github", (data) => {
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (key == name) {
                    console.log(`Downloading... from ${data[key]}. Please wait!`);
                    getGithubInformation(data[key], fullPath, name);
                    break;
                }        
            }
        }
    });
}

var getGithubInformation = (url, fullPath, name) => {
    cp.exec(`git clone ${url} ${fullPath}/${name}`, (err) =>{
        if (err) {
            console.log("Please make sure you have a git cmd client installed on your device!\n If you do not have then a CDN content is also included in the html file");
        }
    });
};

module.exports = {
    downloadFromGit
}