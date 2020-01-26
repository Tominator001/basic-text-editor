const electron = require('electron').remote;
const dialog = electron.dialog;
var fs = require('fs');
var path = require("path");


console.log("Hello world");
async function save(){
    console.log("saving. . . (yes really)");

    const selectedPaths = await dialog.showSaveDialog({
        title: 'Save file'
    });
    console.log(selectedPaths.filePath);
    fs.appendFile(selectedPaths.filePath, document.getElementById("mainTxt").value, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
      document.title = path.basename(selectedPaths.filePath).toString()
}       

async function open(){
    console.log("opening. . . (yes really)");
    const selectedPaths = await dialog.showOpenDialog({
        title: 'Open file'
    });
    console.log(selectedPaths.filePaths[0]);
    fs.readFile(selectedPaths.filePaths[0], function(err, data){
        document.getElementById("mainTxt").value = data;
    });
    document.title = path.basename(selectedPaths.filePaths[0]).toString();
}