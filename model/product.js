export class Product {
    constructor({id, body}, title, price, description, imageUrl, owner='other'){
        this.id = id ?? Date.now();
        this.title = body?.title ?? title;
        this.owner = body?.owner ?? owner;
        this.price = body?.price ?? price;
        this.description = body?.description ?? description;
        this.imageUrl = body?.imageUrl ?? imageUrl;
    }
}