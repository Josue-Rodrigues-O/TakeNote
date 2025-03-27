import express from 'express';
import cors from 'cors';
import sqlite3 from "sqlite3";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { MigrationsService } from './services/migrations-service.js';
import { ApiUsers } from './apis/api-users.js';
import { ApiNotes } from './apis/api-notes.js';
import { ApiAuth } from './apis/api-auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    let db = obterBancoDeDados();
    let migrationsService = new MigrationsService(db);
    await migrationsService.executeAllMigrations();
    configurarApi(db);
}

/**
 * @param {sqlite3.Database} db 
 */
function configurarApi(db) {
    const hostName = 'localhost';
    const port = 3000;
    const app = express();
    app.use(express.json());
    app.use(cors());

    new ApiUsers(app, db);
    new ApiNotes(app, db);
    new ApiAuth(app, db);

    app.listen(port, () => {
        console.log(`Server running on: http://${hostName}:${port}`);
    })
}

function obterBancoDeDados() {
    const dbPath = obterPathBancoDeDados();
    return new sqlite3.Database(dbPath, (err) => {
        if (err)
            console.error('Erro ao conectar ao banco de dados', err.message);
        else
            console.log('Conectado ao banco de dados com sucesso!');
    });
}

function obterPathBancoDeDados(nomeDiretorio = 'data', nomeBanco = 'database') {
    if (!fs.existsSync(path.join(__dirname, nomeDiretorio)))
        fs.mkdirSync(path.join(__dirname, nomeDiretorio), { recursive: true });

    return path.join(__dirname, nomeDiretorio, `${nomeBanco}.db`);
}

main();