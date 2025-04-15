import { Rule } from "./rule.js";

export class Validation {

    /**
     * @param {String} fieldName 
     * @param {any} fieldValue 
     */
    constructor(fieldName, fieldValue) {
        /**@type{any} */
        this.fieldValue = fieldValue;
        /**@type{string} */
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
     * @param {Rule} rule 
     * @returns 
     */
    must(rule) {
        this.rules.push(rule);
        return this;
    }

    /**
     * @returns 
     */
    notEmpty() {
        let rule = new Rule(() => this.fieldValue || this.fieldValue === 0, `${this.fieldName} is required`);
        this.rules.push(rule);
        return this;
    }

    /**
     * @param {Number} length 
     * @returns
     */
    hasMinLength(length) {
        let rule = new Rule(() => this.fieldValue.length >= length, `${this.fieldName} must have at least ${length} characters`);
        this.rules.push(rule);
        return this;
    }

    /**
     * @param {Number} length 
     * @returns
     */
    hasMaxLength(length) {
        let rule = new Rule(() => this.fieldValue.length <= length, `${this.fieldName} must have at most ${length} characters`);
        this.rules.push(rule);
        return this;
    }

    /**
     * @param {any} value 
     * @returns
     */
    isEqual(value) {
        let rule = new Rule(() => this.fieldValue === value, `${this.fieldName} must be equal to ${value}`);
        this.rules.push(rule);
        return this;
    }

    /**
     * @param {RegExp} regex 
     * @returns
     */
    isMatch(regex) {
        let rule = new Rule(() => regex.test(this.fieldValue), `${this.fieldName} must match the correct pattern`);
        this.rules.push(rule);
        return this;
    }
}