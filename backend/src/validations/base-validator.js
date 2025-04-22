import { Validation } from './validation.js';

export class BaseValidator {
    constructor() {
        /** @type{Validation[]} */
        this.validations = [];
    }

    /**
     * 
     * @param {String} fieldName 
     * @param {String} fieldValue 
     * @returns {Validation}
     */
    ruleFor(fieldName, fieldValue) {
        let validation = new Validation(fieldName, fieldValue);
        this.validations.push(validation);
        return validation;
    }

    clearValidations() {
        this.validations = [];
    }

    /**
     * 
     * @returns {string}
     */
    validate() {
        let errors = '';
        this.validations.forEach(validation => {
            try {
                validation.validate();
            } catch (error) {
                errors += error.message + '\n';
            }
        });
        return errors;
    }
}