var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat =
      _(products).chain()
        .filter(function (pizza) {
            return !pizza.containsNuts
          })
        .filter(function (pizza) {
            return _.all(pizza.ingredients,function (ingredient) {
              return (ingredient != "mushrooms");
            });
          })
          .value();

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = _.reduce(_.range(1,1000), function(memo, num){
      if( num % 3 === 0|| num % 5 === 0 ){
        return  memo + num;
      } else{
          return memo;
      }}
    , 0);    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    ingredientCount = _(products).chain()
      .map(function(product){return product.ingredients})
      .flatten()
      .countBy(function (ingredient) {
        return ingredient;
      })
      .value()



    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  it("should find the largest prime factor of a composite number", function () {

    var largestPrimeFactor = function(num) {
      return _.max(_.filter(_.range(2, num), function(i) {
          return (num % i === 0 && isPrime(i));
      }));
    };

    var isPrime = function(num) {
        if(num===2||num===1){return true;}
        return _.all(_.range(2, Math.sqrt(num) + 1), function(i) {
            return (num % i !== 0);
        });
    };


    expect(largestPrimeFactor(1000)).toBe(5);
    expect(largestPrimeFactor(1001)).toBe(13);

  });


  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

    var findLargestPalindrome = function () {
      var i, j, palindromes=[];
      for (i=100; i<1000; i++){
        for (j=100; j<1000; j++){
          if (isPalindrome(i*j+"")){
            palindromes.push(i*j);
          }
        }
      }
      return _.max(palindromes);
    }


    var isPalindrome = function (str) {
      var i;
      for(i=0;i<str.length;i++){
        if(str[i]!=str[str.length-1-i]){
          return false;
        }
      }
      return true;
    };

    expect(findLargestPalindrome()).toBe(906609);

  });

// This works, but takes a REALLY long time. 
  // it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
  //   var smallestDivisible = function () {
  //     var num = 18*19*20;
  //     while(!divisibleByAll(num)){
  //       num++;
  //     }
  //     return num;
  //   };
  //
  //
  //   var isPrime = function(num) {
  //       if(num===2||num===1){return true;}
  //       return _.all(_.range(2, Math.sqrt(num) + 1), function(i) {
  //           return (num % i !== 0);
  //       });
  //   }
  //   var smallestDivisible = function () {
  //     _.chain()
  //     .range(1,21)
  //     .each(largestPrimeFactor)
  //     .reduce(function (memo, num) {
  //       return memo*num
  //     },1)
  //     .value();
  //   };
  //   var divisibleByAll = function(bignum){
  //     return _.all(_.range(1,21),function(smallnum){
  //       return bignum%smallnum===0;
  //     })
  //   };
  //   expect(smallestDivisible()).toBe(232792560);
  // });

/*
  it("should find the difference between the sum of the squares and the square of the sums", function () {

  });

  it("should find the 10001st prime", function () {

  });
  */
});


var sum = _.chain().range(1,1000)
.filter(function(x){ return x%3=== 0||x%5===0;})
.reduce (function(x,y){return x+y;}_
.value();
