import express from 'express';
import sqlite3 from 'sqlite3';
import { AuthService } from '../services/auth-service.js';
import { ApiResponse } from '../models/api-response.js';

export class ApiAuth {

    /**
     * 
     * @param {express.Express} app 
     * @param {sqlite3.Database} db 
     */
    constructor(app, db) {
        this._authService = new AuthService(db);

        app.post('/login', async (req, res) => {
            let apiResponse;
            try {
                let token = await this._authService.login(req.body);
                apiResponse = new ApiResponse('success', 200, 'login realizado com sucesso', { token: token });
            } catch (error) {
                apiResponse = new ApiResponse('error', 400, 'Falha ao realizar login', null, error.message);
            }
            res.send(apiResponse);
        });
    }
}