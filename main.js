const _ = require('lodash')

/**
    Given sequence of fruits
    {
        DayNumber
        Name,
        Region,
        Price
    }

    Find the region which has the cheapest average price within a given month

    Assume there are between 3 and 10 price measurements taken per fruit per day
    Assume we have 360 days per year, 30 days per month, 12 months per year
    Assume a region corresponds to a continent of origin
    Assume all arrays are 0 indexed
 */


//============================
// THese objects are prototypes
//============================
const possibleFruits = [
    { FruitName: 'apple', },
    { FruitName: 'orange' },
    { FruitName: 'pear' },
    { FruitName: 'cantaloupe' },
    { FruitName: 'watermelon' },
    { FruitName: 'kiwi' },
    { FruitName: 'peach' },
    { FruitName: 'grape' },
    { FruitName: 'strawberry' },
    { FruitName: 'banana' },
];

const basePrices = {
    'apple': 1,
    'orange': 1,
    'pear': 1,
    'cantaloupe': 3,
    'watermelon': 3,
    'kiwi': 3,
    'peach': 2,
    'grape': 2,
    'strawberry': 2,
    'banana': 1
}

var possibleRegions = [
    { RegionName: 'north america' },
    { RegionName: 'south america' },
    { RegionName: 'afica' },
    { RegionName: 'europe' },
    { RegionName: 'australia' },
];
/**
 * @function SelectRandom
 * @param  {Array<any>} items {description}
 */
function SelectRandom(items) {
    return items[Math.floor(Math.random() * items.length)];
}
//============================
//
//============================
let INSTANCE_RegionsObject = _.map(possibleRegions, (region) => {
    let priceModifierOfFruitArray = _.map(possibleFruits, (fruit) => _.random(1, 5))
    let possibleFruitNames = _.map(possibleFruits, (fruit) => fruit.FruitName)
    let PriceModifierObject = _.fromPairs(_.zip(possibleFruitNames, priceModifierOfFruitArray))
    return { RegionName: region.RegionName, PriceModifierOfFruit: PriceModifierObject }
});

let INSTANCE_FruitsObject = _.map(possibleFruits, (fruit) => {
    let offset = _.random(0, 2 * Math.PI)
    let PeriodicityModifier = (dayNumber) => 1 + Math.sin(offset + (dayNumber * Math.PI / 180))
    return { FruitName: fruit.FruitName, PeriodicityModifier: PeriodicityModifier }
})


//============================
// Need to map over a range of 1000 days
// And create between 3 and 10 price measurements per fruit per day
//============================
let days = _.range(0, 360);
let nestedFruitRecords = _.map(days, (day) => {
    //For each fruit
    let fruitMaps = _.map(INSTANCE_FruitsObject, (fruit) => {
        //Return between 3 and 10 fruits
        let createdFruits = _.map(_.range(0, _.random(3, 10, false)), (_some) => {
            let INSTANCE_randomlySelectedRegion = SelectRandom(INSTANCE_RegionsObject);
            let INSTANCE_priceMod = INSTANCE_randomlySelectedRegion.PriceModifierOfFruit[fruit.FruitName] * fruit.PeriodicityModifier(day)
            let INSTANCE_price = INSTANCE_priceMod * basePrices[fruit.FruitName]
            return {
                Day: day,
                Name: fruit.FruitName,
                //Region needs to be selected randomly
                Region: INSTANCE_randomlySelectedRegion.RegionName,
                Price: INSTANCE_price
            }
        })
        return createdFruits;
    })
    return fruitMaps;
})
let flattenedFruitRecords = _.flattenDeep(nestedFruitRecords);

debugger;



//==============================
// BEGIN PROGRAMMING HERE
//==============================