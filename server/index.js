require('./database');

const express = require('express');
const path = require('path');

const app = express();

app.use('/', express.static(path.join(__dirname, '../public')));

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Server listening on port ' + port)
});