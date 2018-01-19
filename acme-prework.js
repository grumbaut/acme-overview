//instructions
//write the 4 functions below
//no third party libraries
//try not to use any forEach
//each function should be short and some functions can depend on other functions (hint no function should be more than 10 lines)

//list of products
var products = [
  {
    id: 1,
    price: 5,
    name: 'foo'
  },
  {
    id: 2,
    price: 3,
    name: 'bar'
  },
  {
    id: 3,
    price: 9,
    name: 'bazz'
  }
];

//list of line items
var lineItems = [
   {
     productId: 1,
     quantity: 1
   },
   {
     productId: 1,
     quantity: 1
   },
   {
     productId: 2,
     quantity: 1
   },
   {
     productId: 3,
     quantity: 1
   },
];

//returns an object
//keys are the ids of products
//the values are the products themselves
function generateProductsMap(products){
  return products.reduce(function(acc, item){
    acc[item.id] = item;
    return acc;
  }, {});
}

//returns an object
//keys are the ids of products
//value is the total revenue for that product
function salesByProduct(products, lineItems){
  var productsMap = generateProductsMap(products);
  return lineItems.reduce(function(acc, item) {
    var currID = item.productId;
    var currProduct = productsMap[currID];
    if(currID in acc){
      acc[currID] += currProduct.price * item.quantity;
    } else {
      acc[currID] = currProduct.price * item.quantity;
    }
    return acc;
  }, {});
}

//return the total revenue for all products
function totalSales(products, lineItems){
  var sales = salesByProduct(products, lineItems);
  var sum = 0;
  for(var key in sales){
    sum += sales[key];
  }
  return sum;

  /*ALTERNATIVE SOLUTION USING OBJECT.KEYS INSTEAD OF FOR-IN LOOP:

    return Object.keys(total).reduce(function(memo, key) {
      memo += total[key];
      return memo;
    }, 0)

  */
}

//return the product responsible for the most revenue
function topSellerByRevenue(products, lineItems){
  var sales = salesByProduct(products, lineItems);
  var topSeller = 0;
  var topSellerID;
  for(var key in sales){
    if(sales[key] > topSeller) {
      topSeller = sales[key];
      topSellerID = key;
    }
  }
  return topSellerID;

  /* ALTERNATIVE USING REDUCE:

    var map = generateProductsMap(products);
    var totals = salesByProduct(products, lineItems);
    var productId = Object.keys(totals).reduce(function(memo, key) {
      if(totals[key] > totals[memo]) {
        memo = key;
      }
      return memo;
    });
    return map[productId];
  */
}

console.log(`generates product map - should be
{
  1:{
    id: 1,
    name: "foo",
    price: 5
  },
  2:{
    id: 2,
    name: "bar",
    price: 3
  },
  3:{
    id: 3,
    name: "bazz",
    price: 9
  }
}

`, generateProductsMap(products));
console.log(`sales by product - should be
  {
    1: 10,
    2: 3,
    3: 9
}`, salesByProduct( products, lineItems));
console.log('total sales - should be 22', totalSales( products, lineItems));
console.log('top seller by revenue', topSellerByRevenue(products, lineItems ));
