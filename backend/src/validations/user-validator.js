import { BaseValidator } from './base-validator.js';
import { User } from '../models/user.js';

export class UserValidator extends BaseValidator {
    constructor() {
        super();
    }

    /**
     * @param {User} user 
     */
    prepareValidationForLogin(user) {
        this.ruleFor('email', user.email)
            .notEmpty()
            .isMatch(/^[\w]{1,}@[\w\.]{1,}[a-zA-Z]$/);


        this.ruleFor('password', user.password)
            .notEmpty()
            .hasMinLength(8)
            .isMatch(/[a-z]{1,}[A-Z]{1,}[0-9]{1,}/);
        // .hasMaxLength(100);
    }

    /**
     * @param {User} user 
     */
    prepareValidationForRegister(user) {
        this.ruleFor('email', user.email)
            .notEmpty()
        // .hasMinLength(5)
        // .hasMaxLength(100);

        this.ruleFor('password', user.password)
            .notEmpty()
        // .hasMinLength(8)
        // .hasMaxLength(100);

        this.ruleFor('confirmPassword', user.confirmPassword)
            .notEmpty()
        // .hasMinLength(8)
        // .hasMaxLength(100);
    }
}