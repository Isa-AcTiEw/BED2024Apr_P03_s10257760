import express from "express"
//Start the server
const app = express();

const PORT = 2000;


//Responding to a get request made by the client on root route

app.get('/',(req,res)=>{
    res.send('Hello World!');
});

// Responding to a post request on the root route made by client 
app.post('/',(req,res)=>{
    res.send('Got a POST request');
});


// Respond to a PUT request to the /user route made by client
app.put('/user', (req,res) =>{
    res.send('Got a put request at /user');
});

// Respond to a DELETE request to the /user route made by client 
app.delete('/user', (req,res) =>{
    res.send('Got a DELETE request at /user');
});

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
}).on('error', (err) => {
    console.error('Server startup error:', err);
});

console.log(process.cwd());