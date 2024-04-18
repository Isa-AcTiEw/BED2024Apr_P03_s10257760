const fs = require('fs');
const data = "Hello Isaac, I am Manoman";

fs.writeFile('Week01/test.txt', data, err => {
    if (err) {
        console.error(err);
    } else {
        console.log('File written successfully');
    }
});
