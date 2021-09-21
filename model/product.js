export class Product {
    constructor(id, title, price, description, imageUrl){
        this.id = id ?? Date.now();
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}