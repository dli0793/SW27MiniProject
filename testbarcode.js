const usda = require("usda-ingredients-api");
const results = usda("815893000163");

results.then(function(result) {
    console.log(result[0].foodNutrients[3])//.nutrientNumber) 
 })

console.log(results);