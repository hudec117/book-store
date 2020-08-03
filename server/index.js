require('./database.js');

const configureAPI = require('./configure.js');

const express = require('express');

const app = express();

configureAPI(app);

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Server listening on port ' + port)
});