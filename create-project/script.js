const fs = require('fs');

var createFiles = (files, folderName) => {
    createAFolder(folderName);
    for (let index = 0; index < files.length; index++) {
        fs.writeFile(`${folderName}/${files[index]}`, "", (err) => {
            if (err) {
                console.log(`An error occured while creating the files\n ${err}`);
                return;
            }

            console.log("The files were created!");
        });
    }
}

var createAFolder = (folderName) => {
    var dir = `./${folderName}`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        return;
    }
    console.log(`A folder with this name already exists!`);
}

module.exports = {
    createFiles
}