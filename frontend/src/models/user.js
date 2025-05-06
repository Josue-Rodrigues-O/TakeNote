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

    /**@type {RegExp} */
    _regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    validateRegister() {
        if (!this.name) {
            throw new Error("Name is required");
        }
        if (!this.email) {
            throw new Error("Email is required");
        }
        if (!this.password) {
            throw new Error("Password is required");
        }
        if (!this._regexEmail.test(this.email)) {
            throw new Error("Invalid email format");
        }
        if (this.password !== this.confirmPassword) {
            throw new Error("Passwords do not match");
        }
    }

    validateLogin() {
        if (!this.email) {
            throw new Error("Email is required");
        }
        if (!this.password) {
            throw new Error("Password is required");
        }
        if (!this._regexEmail.test(this.email)) {
            throw new Error("Invalid email format");
        }
        if (this.password.length < 8) {
            throw new Error("Password must be at least 8 characters long");
        }
    }
}