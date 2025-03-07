export class NotesService {
    constructor(db) {
        if (!db) throw new Error('O parâmetro db é obrigatório');
        this.db = db;
    }

    async create(note) {
        return new Promise((resolve, reject) => {
            this.db.run('INSERT INTO notas (titulo, descricao, usuario) VALUES (?, ?, ?)', [note.titulo, note.descricao, note.usuario], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    async getAll() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM notas', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    async getById(id) {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM notas WHERE id = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    async update(id, note) {
        return new Promise((resolve, reject) => {
            this.db.run('UPDATE notas SET titulo = ?, descricao = ? WHERE id = ?', [note.titulo, note.descricao, id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            this.db.run('DELETE FROM notas WHERE id = ?', [id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}