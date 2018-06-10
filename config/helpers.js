const fs = require('fs');

var path = require('path');

var ROOT = path.resolve(__dirname, '..');
var root = path.join.bind(path, ROOT);
var writeJSON = function(file) {
    fs.writeFile(root('result.webpack.config.json'), JSON.stringify(file, null, 4), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

exports.root = root;
exports.writeJSON = writeJSON;
