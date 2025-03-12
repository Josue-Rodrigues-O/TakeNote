import { Migration } from "../models/migration.js";

export class MigrationsService {
    constructor(db) {
        if (!db) throw new Error('O parâmetro db é obrigatório');

        this.db = db;
        this.migrations = [
            new Migration('2021-09-22 Criação da tabela de usuários', `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            );`),

            new Migration('2021-09-22 Criação da tabela de notas', `CREATE TABLE IF NOT EXISTS notes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                userId INTEGER NOT NULL
            );`)
        ];
    }

    async executeAllMigrations() {
        for (const migration of this.migrations) {
            await this._execute(migration);
        }
    }

    /**
     * @param {Migration} migration 
     */
    async _execute(migration) {
        console.log(`Executando migração: ${migration.name}`);
        this.db.run(migration.sql, (err) => {
            if (err) {
                console.error(`Erro ao executar migração: ${migration.name}`, err.message);
            } else {
                console.log(`Sucesso ao executar migração: ${migration.name}`);
            }
        });
    }
}