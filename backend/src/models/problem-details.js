export class ProblemDetails {

    /**
     * @param {string} type 
     * @param {string} title 
     * @param {string} stack 
     * @param {number} status 
     * @param {string} details 
     * @param {string} instance 
     */
    constructor(type, title, stack, status, details, instance) {
        this.type = type;
        this.title = title;
        this.stack = stack;
        this.status = status;
        this.details = details;
        this.instance = instance;
    }

    /** @type {string} */type;
    /** @type {string} */title;
    /** @type {string} */stack;
    /** @type {number} */status;
    /** @type {string} */details;
    /** @type {string} */instance;
}