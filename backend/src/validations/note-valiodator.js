import { Note } from '../models/note.js';
import { BaseValidator } from './base-validator.js';

export class NoteValidator extends BaseValidator {
    constructor() {
        super();
    }

    /**
     * @param {Note} note 
     */
    prepareValidationForCreate(note) {
        this.clearValidations();
        this.ruleFor('title', note.title)
            .notEmpty()
            .hasMinLength(3);
    }

    /**
     * @param {Note} note 
     */
    prepareValidationForUpdate(note) {
        this.clearValidations();
        this.ruleFor('title', note.title)
            .notEmpty()
            .hasMinLength(3);
    }
}