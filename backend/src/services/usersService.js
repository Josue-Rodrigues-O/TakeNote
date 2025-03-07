import { User } from '../models/user.js';
import sqlite3 from "sqlite3";

export class UserService {
    /**
     * @param {sqlite3.Database} db 
     */
    constructor(db) {
        if (!db) throw new Error('O parâmetro db é obrigatório');
        this.db = db;
    }

    /**
     * Adiciona um novo usuário
     * @param {User} user 
     * @returns {Promise<User>}
     */
    async create(user) {
        return new Promise((resolve, reject) => {
            this.db.run('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [user.nome, user.email, user.senha], function (err) {
                if (err) {
                    reject(err);
                } else {
                    user.id = this.lastID;
                    resolve(user)
                }
            });
        });
    }

    /**
     * Obtem todos os usuários
     * @returns {Promise<User[]>}
     */
    async getAll() {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM usuarios;", (err, users) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            });
        });
    }

    /**
     * Obtem um usuário pelo id
     * @param {Number} id 
     * @returns {Promise<User>}
     */
    async getById(id) {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT * FROM usuarios WHERE id = ?`, [id], (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });
    }

    /**
     * Atualiza um usuário
     * @param {Number} id 
     * @param {User} user 
     * @returns {Promise<void>}
     */
    async update(id, user) {
        return new Promise((resolve, reject) => {
            this.db.run('UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?', [user.name, user.email, user.senha, id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * Deleta um usuário
     * @param {Number} id
     * @returns {Promise<void>}
     */
    async delete(id) {
        return new Promise((resolve, reject) => {
            this.db.run('DELETE FROM usuarios WHERE id = ?; DELETE FROM notas WHERE usuarios = ?', [id, id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}