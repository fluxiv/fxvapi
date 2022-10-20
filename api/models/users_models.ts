export class userModels {
    id:string;
    name: string;
    birthday: string;
    email: string;
    password: string;
    isPremium: number;

    constructor (
        id: string,
        name: string,
        birthday: string,
        email: string,
        password: string,
        isPremium: number){
            this.id = id;
            this.name = name;
            this.birthday = birthday;
            this.email = email;
            this.password = password;
            this.isPremium = isPremium;
        }

}