import sqlite3 from "sqlite3";
import { User } from '../models/user.js';
import { UserRepository } from "../repositories/user-repository.js";

export class UserService {
    /**
     * @param {sqlite3.Database} db 
     */
    constructor(db) {
        if (!db) throw new Error('O parâmetro db é obrigatório');
        this._userRepository = new UserRepository(db);
    }

    /**
     * Adiciona um novo usuário
     * @param {User} user 
     * @returns {Promise<User>}
     */
    async create(user) {
        return await this._userRepository.create(user)
    }

    /**
     * Obtem todos os usuários
     * @returns {Promise<User[]>}
     */
    async getAll() {
        return await this._userRepository.getAll()
    }

    /**
     * Obtem um usuário pelo email
     * @param {String} email 
     * @returns {Promise<User>}
     */
    async getByEmail(email) {
        return await this._userRepository.getByEmail(email)
    }

    /**
     * Obtem um usuário pelo id
     * @param {Number} id 
     * @returns {Promise<User>}
     */
    async getById(id) {
        return await this._userRepository.getById(id)
    }

    /**
     * Atualiza um usuário
     * @param {Number} id 
     * @param {User} user 
     * @returns {Promise<void>}
     */
    async update(id, user) {
        await this._userRepository.update(id, user)
    }

    /**
     * Remove um usuário
     * @param {Number} id
     * @returns {Promise<void>}
     */
    async delete(id) {
        await this._userRepository.delete(id)
    }
}