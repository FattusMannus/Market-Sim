var shop1 = {

    name: "Shop 1",
    items: [{
        name: "Shop Item 1",
        qualities: ["blue"],
        baseValue: 50,
        rarity: "Common"
    }, {
        name: "Shop Item 2",
        qualities: ["green"],
        baseValue: 30,
        rarity: "Rare"
    },
    {
        name: "Shop Item 3",
        qualities: ["yellow"],
        baseValue: 45,
        rarity: "Common"
    }],
    likes: ["green", "yellow"],
    dislikes: ["red", "blue"],
    cash: 200
};



var buyer1 = {
    name: "Buyer 1",
    items: [],
    likes: ["green"],
    dislikes: ["red"],
    cash: 300,
    valueDifferencePercentage: 10
};

var buyer2 = {
    name: "Buyer 2",
    items: [{
        name: "Item 1",
        qualities: ["blue"],
        baseValue: 50,
        rarity: "Common"
    }, {
        name: "Item 2",
        qualities: ["green"],
        baseValue: 30,
        rarity: "Rare"
    }],
    likes: ["blue"],
    dislikes: ["yellow"],
    cash: 60,
    valueDifferencePercentage: 0
};


    function visitShop(shop, customer) {
        console.log(shop);
        console.log(customer);
        checkBuy(shop, customer);
        checkSell(shop, customer);
        console.log(shop);
        console.log(customer);


    }

    function checkBuy(shop, customer) {
        console.log(customer.name + " is shopping at " + shop.name);
        if (shop.items.length === 0) {
            console.log(shop.name + " has no items to sell");
            return;
        }

        for (var item = 0; item < shop.items.length; item++) {
            var itemObj = shop.items[item];
            var priceToPay = willSell(itemObj, customer, shop);
            if (priceToPay > 0) {
                if (customer.cash >= priceToPay) {
                    console.log(customer.name + " buys " + itemObj.name + " for " + priceToPay);
                    transferItem(itemObj, shop, customer, priceToPay);
                    item--;
                } else {
                    console.log(customer.name + " has run out of money");
                    break;
                }
            }else{
                 console.log(customer.name + " and " + shop.name + " cannot agree a price");  
            }
        }
    }


    function checkSell(shop, customer) {
        console.log(customer.name + " is selling to " + shop.name);
        if (customer.items.length === 0) {
            console.log(customer.name + " has no items to sell");
            return;
        }

        for (var item = 0; item < customer.items.length; item++) {
            var itemObj = customer.items[item];
            var priceToPay = willSell(itemObj, shop, customer);
            if (priceToPay > 0) {
                if (shop.cash >= priceToPay) {
                    console.log(shop.name + " buys " + itemObj.name + " for " + priceToPay);
                    transferItem(itemObj, customer, shop, priceToPay);
                    item--;
                } else {
                    console.log(shop.name + " has run out of money");
                    break;
                }
            }else{
                 console.log(shop.name + " and " + customer.name + " cannot agree a price");  
            }
        }
    }


    function willSell(item, buyer, seller) {

        var buyersPrice = calcPrice(item, buyer);
        var sellersPrice = calcPrice(item, seller);

        
        
        var buyersBuyBuff = (buyer.valueDifferencePercentage/100 +1);
        if (isNaN(buyersBuyBuff)){
            buyersBuyBuff = 0;
        }
          
        
        buyersPrice = Math.round(buyersPrice * buyersBuyBuff);
        console.log("Buyers Price: "+  buyersPrice +  " - Sellers Price: "+ sellersPrice);
        
        if (buyersPrice >= sellersPrice) {
            return buyersPrice;
        }

        return 0;
    }

    function calcPrice(item, person) {
        var priceToPay = item.baseValue;


        if (person.likes.indexOf(item.qualities[0]) > -1) {
            priceToPay = priceToPay * 1.1;
        }

        if (person.dislikes.indexOf(item.qualities[0]) > -1) {
            priceToPay = priceToPay * 0.9;
        }


        // if rare + 10%
        if (item.rarity == "Rare") {
            priceToPay = priceToPay * 1.1;
        }



        return Math.round(priceToPay);
    }

    function transferItem(itemToTransfer, from, to, price) {

        price = price || 0;

        for (var item in from.items) {
            var itemObj = from.items[item];
            if (itemObj.name == itemToTransfer.name) {
                from.items.splice(item, 1);
                break;
            }
        }
        from.cash += price;

        to.items.push(itemToTransfer);
        to.cash -= price;

    }


    visitShop(shop1, buyer1);
    visitShop(shop1, buyer2);
