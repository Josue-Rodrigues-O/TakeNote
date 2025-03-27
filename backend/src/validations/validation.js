import { Rule } from "./rule.js";

export class Validation {

    constructor(fieldName, fieldValue) {
        this.fieldValue = fieldValue;
        this.fieldName = fieldName;
        /**@type{Rule[]} */
        this.rules = [];
    }

    validate() {
        this.rules.forEach(rule => {
            if (!rule.predicate())
                throw new Error(rule.message);
        });
    }

    /**
     * Define uma nova regra de validação personalizada
     * @param {Rule} rule 
     * @returns 
     */
    must(rule) {
        this.rules.push(rule);
        return this;
    }

    isRequired() {
        let rule = new Rule(() => this.fieldValue || this.fieldValue === 0, `${this.fieldName} is required`);
        this.rules.push(rule);
        return this;
    }

    hasMinLength(length) {
        let rule = new Rule(() => this.fieldValue.length >= length, `${this.fieldName} must have at least ${length} characters`);
        this.rules.push(rule);
        return this;
    }

    hasMaxLength(length) {
        let rule = new Rule(() => this.fieldValue.length <= length, `${this.fieldName} must have at most ${length} characters`);
        this.rules.push(rule);
        return this;
    }
}