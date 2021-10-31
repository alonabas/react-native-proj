

export class OrderItem {
    constructor(productId, count, title, price){
        this.productId = productId;
        this.count = count;
        this.productTitle = title;
        this.price = price
    }
}

export class Order {
    constructor(orderId, date, price, items){
        this.id = orderId;
        this.date = date;
        this.price = price;
        this.items = items;
    }

}