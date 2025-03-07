export class Note {
    constructor(titulo, descricao, usuario) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.usuario = usuario;
    }
    
    id;
    titulo;
    descricao;
    usuario;
}