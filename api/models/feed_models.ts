export class feedModels {
    feedId:string;
    title: string;
    text: string;
    like: any[] | string;
    deslike: any[] | string;
   // created: string;
    //updated: string;
    imgs: string[] | string;
    userId: string;
    name?:string;
    email?:string;
    isPremium?:number;
    photo?:string;

    constructor (
        feedId: string,
        title: string,
        text: string,
        like: any[] | string,
        deslike: any[] | string,
        //created: string,
        //updated: string,
        imgs: string[] | string,
        userId: string,
        name?:string,
        email?:string,
        isPremium?:number,
        photo?:string,
         ){
            this.feedId = feedId;
            this.title = title;
            this.text = text;
            this.like = like;
            this.deslike = deslike;
            //this.created = created;
            //this.updated = updated;
            this.imgs = imgs;
            this.userId = userId;
            this.name = name;
            this.email = email;
            this.isPremium = isPremium;
            this.photo = photo;
        }

}