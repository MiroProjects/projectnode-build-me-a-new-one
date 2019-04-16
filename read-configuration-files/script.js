const fs = require('fs');
var jsObj = null;

var readJsonFile = (name, callback) => {
    var path = `./config/${name}.json`;
    fs.readFile(path, 'utf-8', (err, data) => {
        if(err){
            console.log(`Cannot read file! Please check file's name and directory!\n ${err}`);
        }
    
        jsObj = JSON.parse(data);
        callback(jsObj);
    });
}

module.exports = {
    readJsonFile
}