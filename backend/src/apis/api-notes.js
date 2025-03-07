import express from 'express';
import { NotesService } from '../services/notesService';

export class ApiNotes {
    /**
     * 
     * @param {express.Express} app 
     */
    constructor(app, db) {
        this._notesService = new NotesService(db)
        app.get('/notas', (req, res) => {
            this._notesService.getAll()
                .then(notes => {
                    res.status(200);
                    res.send(notes);
                })
                .catch(error => {
                    res.status(400);
                    res.send(error)
                });
        });

        app.get('/notas/:id', (req, res) => {
            this._notesService.getById(req.params.id)
                .then(note => {
                    res.status(200);
                    res.send(note);
                })
                .catch(error => {
                    res.status(400);
                    res.send(error)
                });
        });

        app.post('/notas', (req, res) => {
            this._notesService.create(req.body)
                .then(note => {
                    res.status(201);
                    res.send(note);
                })
                .catch(error => {
                    res.status(400);
                    res.send(error)
                });
        });

        app.put('/notas/:id', (req, res) => {
            this._notesService.update(req.params.id, req.body)
                .then(() => {
                    res.sendStatus(204);
                })
                .catch(error => {
                    res.status(400);
                    res.send(error)
                });
        });

        app.delete('/notas/:id', (req, res) => {
            this._notesService.delete(req.params.id)
                .then(() => {
                    res.sendStatus(204);
                })
                .catch(error => {
                    res.status(400);
                    res.send(error)
                });
        });
    }
}