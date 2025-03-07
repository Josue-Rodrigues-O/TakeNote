import express from 'express';
import { UserService } from '../services/usersService.js';

export class ApiUsers {
    /**
     * 
     * @param {express.Express} app 
     */
    constructor(app, db) {
        this._userService = new UserService(db);
        app.get('/users', (req, res) => {
            this._userService.getAll()
                .then(users => {
                    res.status(200);
                    res.send(users);
                })
                .catch(error => {
                    res.status(400)
                    res.send(error);
                });
        });

        app.get('/users/:id', (req, res) => {
            this._userService.getById(req.params.id)
                .then(user => {
                    res.status(200);
                    res.send(user);
                })
                .catch(error => {
                    res.status(400)
                    res.send(error);
                });
        });

        app.post('/users', (req, res) => {
            this._userService.create(req.body)
                .then((user) => {
                    res.status(201);
                    res.send(user);
                })
                .catch(error => {
                    res.status(400)
                    res.send(error);
                });
        });

        app.put('/users/:id', (req, res) => {
            this._userService.update(req.params.id, req.body)
                .then(() => {
                    res.sendStatus(204);
                })
                .catch(error => {
                    res.status(400)
                    res.send(error);
                });
        });

        app.delete('/users/:id', (req, res) => {
            this._userService.delete(req.params.id)
                .then(() => {
                    res.sendStatus(204);
                })
                .catch(error => {
                    res.status(400)
                    res.send(error);
                });
        });
    }
}