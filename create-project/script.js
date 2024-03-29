const fs = require('fs');
const downloadFile = require("../download-files/script");
const html = require("../config/configVariables");

//Enumeration for the start HTML content for every project
var projectEnum = {
    basic: "simple",
    bootstrap: "bootstrap",
    jquery: "jquery",
    server: "server"
};

var createFile = (files, folderName, path, projectType, content = "") => {
    if(!createFolder(folderName, path)){
        console.log("A folder with the same na already exists!");
        return;
    }

    for (let index = 0; index < files.length; index++) {
        //If the files start with '@' then download them from GitHub
        if (files[index].startsWith("@")) {
            downloadFile.downloadFromGit(files[index].substr(1), `${path}/${folderName}`);
            continue;
        }

        //If the files start with '#' then download them from NPM
        if (files[index].startsWith("#")) {
            downloadFile.downloadNPMPackage(files[index].substr(1), `${path}/${folderName}`);
            continue;
        }

        if (files[index].endsWith('.html')) {
            if (projectType.includes(projectEnum.bootstrap)) {
                content = html.htmlBootstrap;
            }
            else if(projectType.includes(projectEnum.basic)){
                content = html.html5;
            }
            else if(projectType.includes(projectEnum.jquery)){
                content = html.htmlJquery;
            }
            else if(projectType.includes(projectEnum.server)){
                content = html.html5;
            }
        }

        fs.writeFile(`${path}/${folderName}/${files[index]}`, content, (err) => {
            if (err) {
                console.log(`An error occured while creating the files\n ${err}`);
                return;
            }
        });
        content = "";
    }
    console.log("The folder with files was created successfully!");
}

var createFolder = (folderName, path) => {
    var dir = `${path}/${folderName}`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        return true;
    }
    return false;
}

module.exports = {
    createFile
}