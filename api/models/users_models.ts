export class userModels {
    id:string;
    name: string;
    birthday: string;
    email: string;
    password: string;
    isPremium: number;
    terms: number;

    constructor (
        id: string,
        name: string,
        birthday: string,
        email: string,
        password: string,
        isPremium: number,
        terms: number ){
            this.id = id;
            this.name = name;
            this.birthday = birthday;
            this.email = email;
            this.password = password;
            this.isPremium = isPremium;
            this.terms = terms
        }

}