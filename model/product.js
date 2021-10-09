export class Product {
    constructor(id, title, price, description, imageUrl, owner='other'){
        this.id = id ?? Date.now();
        this.title = title;
        this.owner = owner;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}