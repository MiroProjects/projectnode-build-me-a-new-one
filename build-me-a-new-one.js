const readFile = require('./read-configuration-files/script');
const file = require('./create-project/script');

var getProjectType = process.argv[2];
var projectName = process.argv[3];

readFile.readJsonFile("build-me", (data) => {
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key == getProjectType) {
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
                file.createFile(arrayFiles, projectName, ".", getProjectType);
                continue;
            }

            file.createFile(arrayFiles, key, `./${projectName}`, getProjectType);
        }
    }
}