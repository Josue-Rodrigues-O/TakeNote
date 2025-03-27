import sqlite3 from 'sqlite3';
import { Note } from '../models/note.js';
import { NoteRepository } from "../repositories/note-repository.js";

export class NotesService {

    /**
     * 
     * @param {sqlite3.Database} db 
     */
    constructor(db) {
        if (!db) throw new Error('O parâmetro db é obrigatório');
        this._noteRepository = new NoteRepository(db);
    }

    /**
     * Adiciona uma nova nota
     * @param {Note} note 
     * @returns {Promise<Note>}
     */
    async create(note, userId) {
        return await this._noteRepository.create(note, userId);
    }

    /**
     * Obtem todas as notas do usuário
     * @param {Number} userId 
     * @returns {Promise<Note[]>}
     */
    async getAll(userId) {
        return await this._noteRepository.getAll(userId);
    }

    /**
     * Obtem uma nota por id
     * @param {Number} id 
     * @returns {Promise<Note>}
     */
    async getById(id, userId) {
        return await this._noteRepository.getById(id, userId);
    }

    /**
     * Atualiza uma nota
     * @param {Number} id 
     * @param {Note} note 
     * @returns {Promise<void>}
     */
    async update(id, note, userId) {
        return await this._noteRepository.update(id, note, userId);
    }

    /**
     * Remove uma nota
     * @param {Number} id 
     * @returns {Promise<void>}
     */
    async delete(id, userId) {
        return await this._noteRepository.delete(id, userId);
    }
}