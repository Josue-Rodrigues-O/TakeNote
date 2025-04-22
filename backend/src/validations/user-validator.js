import { BaseValidator } from './base-validator.js';
import { User } from '../models/user.js';
import { Rule } from './rule.js';

export class UserValidator extends BaseValidator {
    _regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    constructor() {
        super();
    }

    /**
     * @param {User} user 
     */
    prepareValidationForLogin(user) {
        this.clearValidations();
        this.ruleFor('email', user.email)
            .notEmpty()
            .isMatch(this._regexEmail);


        this.ruleFor('password', user.password)
            .notEmpty()
            .hasMinLength(8);
    }

    /**
     * @param {User} user 
     */
    prepareValidationForRegister(user) {
        this.clearValidations();
        this.ruleFor('email', user.email)
            .notEmpty()
            .isMatch(this._regexEmail);

        this.ruleFor('password', user.password)
            .notEmpty()
            .hasMinLength(8);

        this.ruleFor('confirmPassword', user.confirmPassword)
            .notEmpty()
            .must(new Rule(() => user.password === user.confirmPassword, 'Passwords do not match'));
    }
}