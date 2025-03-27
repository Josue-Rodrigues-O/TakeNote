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
        let errors = this._userValidator.validate(user);
        if (errors.length > 0)
            throw new Error(errors.toString());

        let userDb = await this._userService.getByEmail(user.email);
        if (userDb.password !== user.password) {
            throw new Error('Senha incorreta');
        }

        let token = jsonwebtoken.sign(userDb, 'minha-chave-secreta')
        return token;
    }

    /**
     * 
     * @param {string} token 
     * @returns {jsonwebtoken.JwtPayload}
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
            throw new Error('Nenhum usuário logado');
        
        return this._curerntUser;
    }
}