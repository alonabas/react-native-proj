import {THIS_USER} from '../store/constants'
export class Product {
    constructor(id, title, price, description, imageUrl, user=THIS_USER){
        this.id = id ?? Date.now();
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.user = user;
    }
}