import sqlite3 from "sqlite3";
import { Note } from "../models/note.js";

export class NoteRepository {

    /**
     * 
     * @param {sqlite3.Database} db 
     */
    constructor(db) {
        if (!db) throw new Error('O parâmetro db é obrigatório');
        this.db = db;
    }

    /**
     * Adiciona uma nova nota
     * @param {Note} note 
     * @param {Number} userId 
     * @returns {Promise<Note>}
     */
    async create(note, userId) {
        return new Promise((resolve, reject) => {
            this.db.run('INSERT INTO notes (title, description, userId) VALUES (?, ?, ?)', [note.title, note.description, userId], function (err) {
                if (err) {
                    reject(err);
                } else {
                    note.id = this.lastID;
                    resolve(note);
                }
            });
        });
    }

    /**
     * Obtem todas as notas do usuário
     * @param {Number} userId 
     * @returns {Promise<Note[]>}
     */
    async getAll(userId) {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM notes WHERE userId = ?', [userId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    /**
     * Obtem uma nota por id
     * @param {Number} id 
     * @param {Number} userId 
     * @returns {Promise<Note>}
     */
    async getById(id, userId) {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM notes WHERE id = ? AND userId = ?', [id, userId], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    /**
     * Atualiza uma nota
     * @param {Number} id 
     * @param {Note} note 
     * @param {Number} userId 
     * @returns {Promise<void>}
     */
    async update(id, note, userId) {
        return new Promise((resolve, reject) => {
            this.db.run('UPDATE notes SET title = ?, description = ? WHERE id = ? AND userId = ?', [note.title, note.description, id, userId], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * Deleta uma nota
     * @param {Number} id 
     * @param {Number} userId 
     * @returns {Promise<void>}
     */
    async delete(id, userId) {
        return new Promise((resolve, reject) => {
            this.db.run('DELETE FROM notes WHERE id = ? AND userId = ?', [id, userId], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}