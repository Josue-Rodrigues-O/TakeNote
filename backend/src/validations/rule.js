export class Rule {

    /**
     * 
     * @param {Function} func função de validação que deve retornar um booleano
     * @param {String} message 
     */
    constructor(func, message) {
        this.func = func;
        this.message = message;
    }
}