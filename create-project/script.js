const fs = require('fs');
const downloadFile = require("../download-files/script");

var createFiles = (files, folderName, path) => {
    if(!createAFolder(folderName, path)){
        console.log("A folder with the same na already exists!");
        return;
    }

    for (let index = 0; index < files.length; index++) {
        if (files[index].startsWith("@")) {
            downloadFile.downloadGit(files[index].substr(1));
            continue;
        }

        fs.writeFile(`${path}/${folderName}/${files[index]}`, "", (err) => {
            if (err) {
                console.log(`An error occured while creating the files\n ${err}`);
                return;
            }
        });
    }
    console.log("The files were created!");
}

var createAFolder = (folderName, path) => {
    var dir = `${path}/${folderName}`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        return true;
    }
    return false;
}

module.exports = {
    createFiles
}