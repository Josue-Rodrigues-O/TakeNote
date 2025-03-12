export class Note {
    constructor(title, description, userId) {
        this.title = title;
        this.description = description;
        this.userId = userId;
    }
    
    id;
    title;
    description;
    userId;
}