export class ApiResponse {

    /**
     * @param {String} status 
     * @param {Number} code 
     * @param {any} data 
     * @param {Error} error 
     */
    constructor(status, code, message, data, error) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.data = data;
        this.error = error;
    }

    /** @type {String} */
    status;
    /** @type {Number} */
    code;
    /** @type {String} */
    message;
    /** @type {any} */
    data;
    /** @type {Error} */
    error;
}