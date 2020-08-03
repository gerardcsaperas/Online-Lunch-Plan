/*
Function used to calculate the total amount (€) of the order.
*/

module.exports = function(items) {
    // Drink Sales
    let drinksTotal = 0;

    const { water, cola, colaZero, beer, lemonFanta, orangeFanta } = items.drinks;
    drinksTotal += water * 100;
    drinksTotal += (cola + colaZero + lemonFanta + orangeFanta) * 130;
    drinksTotal += beer * 150;

    // Food Sales
    let foodTotal = 0;

    foodTotal += items.primerSegonCount * 895;
    foodTotal += items.dosPrimersCount * 795;
    foodTotal += items.platPostresCount * 695;

    // Total Sales
    grandTotal = parseInt(drinksTotal + foodTotal);

    return grandTotal;
};