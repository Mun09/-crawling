const express = require('express');

const app = express();

const path = require('path');

const port = process.env.PORT || 5000;
app.listen(port);

app.use('/api/data', function(req, res) {
    res.json({ greeting: 'Hello Wold' });
});

console.log(`server running at http ${port}`);