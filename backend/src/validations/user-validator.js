import { BaseValidator } from './base-validator.js';
import { User } from '../models/user.js';

export class UserValidator extends BaseValidator {


    constructor() {
        super();
    }

    /**
     * @param {User} user 
     */
    validationForLogin(user) {
        this.ruleFor('email', user.email)
            .isRequired()
            .hasMinLength(5)
            .hasMaxLength(100)
            .isEmail();

        this.ruleFor('password', user.password)
            .isRequired()
            .hasMinLength(8)
            .hasMaxLength(100);
    }

    /**
     * @param {User} user 
     */
    validationForRegister(user) {
        this.ruleFor('email', user.email)
            .isRequired()
            .hasMinLength(5)
            .hasMaxLength(100)
            .isEmail();

        this.ruleFor('password', user.password)
            .isRequired()
            .hasMinLength(8)
            .hasMaxLength(100);

        this.ruleFor('confirmPassword', user.confirmPassword)
            .isRequired()
            .hasMinLength(8)
            .hasMaxLength(100);
    }
}