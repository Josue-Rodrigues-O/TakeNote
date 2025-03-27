export class Rule {

    /**
     * 
     * @param {Function} predicate função de validação que deve retornar um booleano
     * @param {String} message 
     */
    constructor(predicate, message) {
        this.predicate = predicate;
        this.message = message;
    }
}