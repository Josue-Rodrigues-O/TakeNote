export class Migration {
    constructor(name, sql) {
        this.name = name;
        this.sql = sql;
    }

    name = '';
    sql = '';
}