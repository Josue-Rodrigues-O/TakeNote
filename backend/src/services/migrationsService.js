import { Migration } from "../models/migration.js";

export class MigrationsService {
    constructor(db) {
        if (!db) throw new Error('O parâmetro db é obrigatório');

        this.db = db;
        this.migrations = [
            new Migration('2021-09-22 Criação da tabela de usuários', `CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                senha TEXT NOT NULL
            );`),

            new Migration('2021-09-22 Criação da tabela de notas', `CREATE TABLE IF NOT EXISTS notas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                titulo TEXT NOT NULL,
                descricao TEXT NOT NULL,
                usuario INTEGER NOT NULL
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