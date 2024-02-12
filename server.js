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

app.post('/api/notes', (req, res) => {
    const task = req.body;
    fs.readFile('db.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log('Error getting tasks');
            return response.status(500).json({error: 'Error reading file'});
        }
        let taskInfo = [];
        if (jsonString) {
            taskInfo = JSON.parse(jsonString);
        }
        taskInfo.push(task);
        fs.writeFile('db.json', JSON.stingify(jsonData), (err) => {
            if (err) {
                console.log('Error writing file:', err);
                return res.status(500).json({ error: 'Error writing file'});
            }
            return res.status(200).json({ message: 'Data written to file successfully'});
        })
    })
})




app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});