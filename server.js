const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = 3001;
const app = express();

app.use(express.static('public'));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/notes', (req, res) => {
    const filePath = path.join(__dirname, 'db', 'db.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if(err){
            console.error(err);
            res.status(500).send('Error reading data file');
            return;
        }

        try {
            res.json(JSON.parse(data));
        } catch (error) {
            console.error(error);
            res.status(500).send('error parsing data');
        }
    })
})




app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});