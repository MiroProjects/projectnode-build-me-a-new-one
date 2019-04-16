const readFile = require('./read-configuration-files/script');
const createFile = require('./create-project/script');
var getProjectType = process.argv[2];
createFile.createFiles(["index.html", "bb.script", "style.css"], "MyProject");

readFile.readJsonFile("build-me", (data) => {
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key == getProjectType) {
                
            }
        }
    }
});