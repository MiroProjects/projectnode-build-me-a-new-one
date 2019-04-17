const readFile = require('./read-configuration-files/script');
const createFile = require('./create-project/script');

var getProjectType = process.argv[2];
var projectName = process.argv[3];

readFile.readJsonFile("build-me", (data) => {
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key == getProjectType) {
                createAllFiles(data[key]);
                return;
            }
        }
    }
    console.log("Wrong project name!");
});

var createAllFiles = (data) => {
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var arrayFiles = data[key];
            if (key == "_") {
                createFile.createFiles(arrayFiles, projectName, ".");
                continue;
            }

            createFile.createFiles(arrayFiles, key, `./${projectName}`);
        }
    }
}