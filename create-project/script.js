const fs = require('fs');
const downloadFile = require("../download-files/script");
const html = require("../config/configVariables");

var projectEnum = {
    basic: "simple",
    bootstrap: "bootstrap"
};

var createFile = (files, folderName, path, projectType, content = "") => {
    if(!createFolder(folderName, path)){
        console.log("A folder with the same na already exists!");
        return;
    }

    for (let index = 0; index < files.length; index++) {
        if (files[index].startsWith("@")) {
            downloadFile.downloadFromGit(files[index].substr(1), `${path}/${folderName}`);
            continue;
        }

        if (files[index].endsWith('.html')) {
            if (projectType.includes(projectEnum.bootstrap)) {
                content = html.htmlBootstrap;
            }
            else if(projectType.includes(projectEnum.basic)){
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