const express = require('express')
const request = require('request')
const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.get('/api/joke', (req, res) => {

    //Make the API call to get the joke
    request('https://icanhazdadjoke.com/', { json: true }, (error, response, body) => {

        if (error && response.statusCode == 200) { 
            return console.log(error); 
        }
        console.log(body);
        res.json(body);
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

app.listen(port, () => console.log(`Listening on port ${port}`));