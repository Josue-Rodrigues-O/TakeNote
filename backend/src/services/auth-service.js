import { User } from '../models/user.js';
import { UserService } from './users-service.js';
import { UserValidator } from '../validations/user-validator.js';
import jsonwebtoken from 'jsonwebtoken';

export class AuthService {
    /**
     * 
     * @param {sqlite3.Database} db 
     */
    constructor(db) {
        this._userService = new UserService(db);
        this._userValidator = new UserValidator();
    }

    /**@type {User} */
    _curerntUser = null;

    /**
     * 
     * @param {User} user 
     * @returns {Promise<string>} Token
     */
    async login(user) {
        this._userValidator.prepareValidationForLogin(user);
        let errors = this._userValidator.validate();
        if (errors)
            throw new Error(errors);

        let userDb = await this._userService.getByEmail(user.email);
        if (!userDb)
            throw new Error('User not found');

        if (userDb.password !== user.password)
            throw new Error('Incorrect password');

        let token = this._generateToken(userDb);
        return token;
    }

    /**
     * 
     * @param {User} user 
     * @returns {Promise<string>} Token
     */
    async register(user) {
        this._userValidator.prepareValidationForRegister(user);
        let errors = this._userValidator.validate();
        if (errors)
            throw new Error(errors);

        if (await this._userService.getByEmail(user.email))
            throw new Error('User already exists');

        let userDb = await this._userService.create(user);
        let token = this._generateToken(userDb);
        return token;
    };

    /**
     * 
     * @param {string} token 
     * @returns {void}
     */
    validateToken(token) {
        token = token.replace('Bearer ', '');
        this._curerntUser = jsonwebtoken.verify(token, 'minha-chave-secreta');
    }

    /**
     * É necessário validar o token antes de chamar este método
     * @returns {User} Usuário logado
     */
    getCurrentUser() {
        if (!this._curerntUser)
            throw new Error('User not logged in');

        return this._curerntUser;
    }

    /**
     * 
     * @param {User} user 
     * @returns {string} Token
     * @description Gera um token para o usuário
     */
    _generateToken(user) {
        /**@type {User} */
        let newUser = {
            id: user.id,
            name: user.name,
            email: user.email
        };
        return jsonwebtoken.sign(newUser, 'minha-chave-secreta');
    }
}