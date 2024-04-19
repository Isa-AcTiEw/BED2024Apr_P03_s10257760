const express = require('express');
const app = express();
PORT = 2000;
app.use(express.static('./public'));
// start the server to serve the files on
PORT = 2000;
app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`)
});