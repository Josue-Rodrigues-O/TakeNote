export class User {
    /**
     * @param {String} name 
     * @param {String} email 
     * @param {String} password 
     * @param {String} confirmPassword 
     */
    constructor(name, email, password, confirmPassword) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

    /**@type {Number} */
    id;
    /**@type {String} */
    name;
    /**@type {String} */
    email;
    /**@type {String} */
    password;
    /**@type {String} */
    confirmPassword;
}