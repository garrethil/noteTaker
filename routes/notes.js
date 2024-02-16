const notes = require('express').Router();
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils.js');

notes.use(express.json());

notes.get('/', (req, res) => {

});

notes.post('/', (req, res) => {
    console.info(`${req.method} request receieved to add tip`);

    const { title, text } = req.body;

    if (title && text) {
                const newNote = {
                    id: uuidv4(),
                    title,
                    text,
                }
                readAndAppend(newNote, './db/db.json');

                const response = {
                    status: 'success',
                    body: newNote,
                };

                res.json(response);
            } else {
                res.json('Error in posting feedback');
            }
        });
     

;

module.exports = notes;