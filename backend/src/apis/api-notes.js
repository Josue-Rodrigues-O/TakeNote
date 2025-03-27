import express from 'express';
import sqlite3 from 'sqlite3';
import { NotesService } from '../services/notes-service.js';
import { ApiResponse } from '../models/api-response.js';
import { AuthService } from '../services/auth-service.js';

export class ApiNotes {
    /**
     * @param {express.Express} app 
     * @param {sqlite3.Database} db 
     */
    constructor(app, db) {
        this._notesService = new NotesService(db)
        this._authService = new AuthService(db);

        app.get('/notas', async (req, res) => {
            let apiResponse;
            try {
                this._authService.validateToken(req.headers.authorization);
                let user = this._authService.getCurrentUser();
                let notes = await this._notesService.getAll(user.id);
                apiResponse = new ApiResponse('success', 200, 'Notas obtidas com sucesso', notes);
            } catch (error) {
                apiResponse = new ApiResponse('error', 400, 'Falha ao obter notas', null, error.message);
            }
            res.send(apiResponse);
        });

        app.get('/notas/:id', async (req, res) => {
            let apiResponse;
            try {
                this._authService.validateToken(req.headers.authorization);
                let user = this._authService.getCurrentUser();
                let note = await this._notesService.getById(req.params.id, user.id);
                apiResponse = note
                    ? new ApiResponse('success', 200, 'Nota obtida com sucesso', note)
                    : new ApiResponse('success', 204, 'Nota não encontrada');
            } catch (error) {
                apiResponse = new ApiResponse('error', 400, 'Falha ao obter nota', null, error.message);
            }
            res.send(apiResponse);
        });

        app.post('/notas', async (req, res) => {
            let apiResponse;
            try {
                this._authService.validateToken(req.headers.authorization);
                let user = this._authService.getCurrentUser();
                let note = await this._notesService.create(req.body, user.id);
                apiResponse = new ApiResponse('success', 201, 'Nota adicionada com sucesso', note);
            } catch (error) {
                apiResponse = new ApiResponse('error', 400, 'Falha ao adicionar nota', null, error.message);
            }
            res.send(apiResponse);
        });

        app.put('/notas/:id', async (req, res) => {
            let apiResponse;
            try {
                this._authService.validateToken(req.headers.authorization);
                let user = this._authService.getCurrentUser();
                await this._notesService.update(req.params.id, req.body, user.id);
                apiResponse = new ApiResponse('success', 204, 'Nota atualizada com sucesso');
            } catch (error) {
                apiResponse = new ApiResponse('error', 400, 'Falha ao atualizar nota', null, error.message);
            }
            res.send(apiResponse);
        });

        app.delete('/notas/:id', async (req, res) => {
            let apiResponse;
            try {
                this._authService.validateToken(req.headers.authorization);
                let user = this._authService.getCurrentUser();
                await this._notesService.delete(req.params.id, user.id);
                apiResponse = new ApiResponse('success', 204, 'Nota removida com sucesso');
            } catch (error) {
                apiResponse = new ApiResponse('error', 400, 'Falha ao remover nota', null, error.message);
            }
            res.send(apiResponse);
        });
    }
}