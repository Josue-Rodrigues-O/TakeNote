import express from 'express';
import sqlite3 from 'sqlite3';
import { UserService } from '../services/users-service.js';
import { UserValidator } from '../validations/user-validator.js';
import { ApiResponse } from '../models/api-response.js';

export class ApiUsers {
    /**
     * 
     * @param {express.Express} app 
     * @param {sqlite3.Database} db
     */
    constructor(app, db) {
        this._userService = new UserService(db);
        this._userValidator = new UserValidator();

        app.get('/users', async (req, res) => {
            let apiResponse;
            try {
                let users = await this._userService.getAll();
                apiResponse = new ApiResponse('success', 200, 'Usuários obtidos com sucesso', users);
            } catch (error) {
                apiResponse = new ApiResponse('error', 400, 'Falha ao obter usuários', null, error);
            }
            res.send(apiResponse);
        });

        app.get('/users/:id', (req, res) => {
            let apiResponse;
            try {
                let user = this._userService.getById(req.params.id)
                apiResponse = new ApiResponse('success', 200, 'Usuário obtido com sucesso', user);
            } catch (error) {
                apiResponse = new ApiResponse('error', 400, 'Falha ao obter usuário', null, error);
            }
            res.send(apiResponse);
        });

        app.post('/users', async (req, res) => {
            let apiResponse;
            try {
                let user = await this._userService.create(req.body);
                apiResponse = new ApiResponse('success', 201, 'Usuário adicionado com sucesso', user);
            } catch (error) {
                apiResponse = new ApiResponse('error', 400, 'Falha ao adicionar usuário', null, error.message);
            }
            res.send(apiResponse);
        });

        app.put('/users/:id', async (req, res) => {
            let apiResponse;
            try {
                await this._userService.update(req.params.id, req.body)
                apiResponse = new ApiResponse('success', 204, 'Usuário atualizado com sucesso');
            } catch (error) {
                apiResponse = new ApiResponse('error', 400, 'Falha ao atualizar usuário', null, error);
            }
            res.send(apiResponse);
        });

        app.delete('/users/:id', async (req, res) => {
            let apiResponse;
            try{
                await this._userService.delete(req.params.id);
                apiResponse = new ApiResponse('success', 204, 'Usuário removido com sucesso');
            } catch (error) {
                apiResponse = new ApiResponse('error', 400, 'Falha ao remover usuário', null, error);
            }
            res.send(apiResponse);
        });
    }
}