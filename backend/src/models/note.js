export class Note {
    /**
     * @param {String} title 
     * @param {String} description 
     * @param {Number} userId 
     */
    constructor(title, description, userId) {
        this.title = title;
        this.description = description;
    }
    
    /**@type {Number} */
    id;
    /**@type {String} */
    title;
    /**@type {String} */
    description;
    /**@type {Number} */
    userId;
}