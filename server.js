const express = require('express')
const request = require('request')
const path = require('path'); 
const app = express();
const port = process.env.PORT || 5000;

app.get('/api/joke', (req, res) => {

    //Make the API call to get the random joke
    request('https://icanhazdadjoke.com/', { json: true }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.json(body);
        } else {
            return console.log(error);
        }
    });
});

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Listening on port ${port} in env `));