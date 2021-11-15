

export class OrderItem {
    constructor(productId, count, title, price){
        this.productId = productId;
        this.count = count;
        this.productTitle = title;
        this.price = price
    }
}

export class Order {
    constructor({id, json}, date, price, items){
        this.id = id;
        this.date = date ?? json.date;
        this.price = price ?? json.price;
        this.items = items ?? json.items.map(oi => new OrderItem(oi?.productId, oi.count, oi.productTitle, oi.price));
    }

}