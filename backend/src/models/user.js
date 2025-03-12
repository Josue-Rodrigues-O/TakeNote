export class User {
    constructor(name, email, password, confirmPassword) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword
    }
    
    id;
    name;
    email;
    password;
    confirmPassword;
}