let fruitsData = require('./fruits.js')

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
    { RegionName: 'africa' },
    { RegionName: 'europe' },
    { RegionName: 'australia' },
];

function findMonth(day){
    switch (Math.floor(day/30)){
        case(0):
            return 'January'
        case(1):
            return 'February'
        case(2):
            return 'March'
        case(3):
            return 'April'
        case(4):
            return 'May'
        case(5):
            return 'June'
        case(6):
            return 'July'
        case(7):
            return 'August'
        case(8):
            return 'September'
        case(9):
            return 'October'
        case(10):
            return 'November'
        case(11):
            return 'December'
        default:
            return 'findMonth error'
    }
}

let allPricesByMonth = {
    'January': [],
    'February': [],
    'March': [],
    'April': [],
    'May': [],
    'June': [],
    'July': [],
    'August': [],
    'September': [],
    'October': [],
    'November': [],
    'December': []
}

fruitsData.data.forEach((dayData) => {
    let month = findMonth(dayData.Day)
    allPricesByMonth[month].push(dayData)
})

class fruitByMonthData {
  constructor(name, region, averagePrice){
    this.name = name,
    this.region = region,
    this.averagePrice = averagePrice
  }
}

  // takes in pricing data for that month
  // returns an object by sorted by fruit type
function sortByFruits(eachMonthData){
  console.log(eachMonthData[0])  // <==fruitPricePoint
  console.log('//////')
//   console.log(eachMonthData)

  // this array stores the average price of each fruit for that month
  let fruitPricesMonth = []
  // initialize with first price point from eachMonthData
  fruitPricesMonth.push(new fruitByMonthData(eachMonthData[0].Name, eachMonthData[0].Region, eachMonthData[0].Price))
  eachMonthData.splice(0,1)

  eachMonthData.forEach((fruitPricePoint) =>{
    fruitPricesMonth.forEach((fruitData)=>{
        if(fruitData.Name === fruitPricePoint.Name){
            if(fruitData.Region === fruitPricePoint.Region) {
                fruitData.Price = fruitData.Price + fruitPricePoint.Price / 2
            } else {
                fruitPricesMonth.push(new fruitByMonthData(eachMonthData.Name, eachMonthData.Region, eachMonthData.Price))
            }
        } else {
          fruitPricesMonth.push(new fruitByMonthData(eachMonthData.Name, eachMonthData.Region, eachMonthData.Price))
        }
    })
  })
}



sortByFruits(allPricesByMonth.January)
