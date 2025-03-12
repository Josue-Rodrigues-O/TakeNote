import express from 'express';
import sqlite3 from 'sqlite3';
import { UserService } from '../services/users-service.js';

export class ApiLogin {

    /**
     * 
     * @param {express.Express} app 
     * @param {sqlite3.Database} db 
     */
    constructor(app, db) {
        this._userService = new UserService(db);

        app.post('/login', (req, res) => {
            this._userService.getByEmail(req.query.email)
                .then(user => {
                    res.status(200);
                    res.send(user);
                })
                .catch(error => {
                    res.status(400)
                    res.send(error);
                });
        });
    }
}