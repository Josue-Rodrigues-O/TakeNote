export class Migration {
    /**
     * @param {String} name 
     * @param {String} sql 
     */
    constructor(name, sql) {
        this.name = name;
        this.sql = sql;
    }

    /**@type {String} */
    name;
    /**@type {String} */
    sql;
}