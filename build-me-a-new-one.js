const readFile = require('./read-configuration-files/script');
const file = require('./create-project/script');
const projectType = process.argv[2];
var projectName = process.argv[3];

//Read the data for the project types
readFile.readJsonFile("build-me", (data) => {
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            //Check if there is a parameter given for the project name and sets default if there isn't
            if (key == projectType) {
                if(!projectName){
                    projectName = "Project";
                }
                createAllFiles(data[key]);
                return;
            }
        }
    }
    console.log("Wrong project type!");
});

var createAllFiles = (data) => {
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var arrayFiles = data[key];
            if (key == "_") {
                file.createFile(arrayFiles, projectName, ".", projectType);
                continue;
            }

            file.createFile(arrayFiles, key, `./${projectName}`, projectType);
        }
    }
}