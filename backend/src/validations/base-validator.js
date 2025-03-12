import { Validation } from './validation.js';

export class BaseValidator {
    constructor() {
        this.validations = [];
    }

    ruleFor(fieldName, fieldValue) {
        let validation = new Validation(fieldName, fieldValue);
        this.validations.push(validation);
        return validation;
    }

    validate() {
        let errors = [];
        this.validations.forEach(validation => {
            try {
                validation.validate();
            } catch (error) {
                errors.push(error.message);
            }
        });
        return errors;
    }
}