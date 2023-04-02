// Author: Jonnathan Guarate

const _ = require('lodash');

console.log("Program Start (Phase 1): Create a deck of cards");
console.log("Processing...");

const printDeckContent = (deck) => {
    for (const card in deck) {
      console.log(`${card}: ${deck[card]}`);
    }
};

const printDeckContentFormatted = (deckToPrint) => Object.keys(deckToPrint).forEach(key => console.log(`${key}`));


const printDeckContentFormattedWithMagicTrick = (countPerValue) => {
    const result = Object.entries(countPerValue).forEach(([value, count]) => {
        console.log(`${value}: ${count}`);
    });
    console.log(`Ace: 0`);
}

const cardsDeckGenerator = () => {
    const cardType = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const cardPip = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
    const valueMap = {
        Jack: 11,
        Queen: 12,
        King: 13,
        Ace: 14,
    };
    const result = {};

    cardType.map(singleType => {
        cardPip.map(singlePip => {
        const cardGenerated = `${singlePip} of ${singleType}`;
        const pipToNumber = valueMap[singlePip] || parseInt(singlePip);
        result[cardGenerated] = pipToNumber;
        });
    });

    return result;
};

console.log("Program End (Phase 1): Result ==>");

// Result A
printDeckContent(cardsDeckGenerator());

console.log("Program Start (Phase 2): Shuffle Deck");
console.log("Processing...");

const cardsDeckClone = {...cardsDeckGenerator()};

const shuffledDeck = _.shuffle(Object.entries(cardsDeckClone)).reduce((obj, [key, value]) => {
    obj[key] = value;
    if (!!obj) {
        return obj;
    }
    else {
        return "Error code 14: Missing card (:"
    }
}, {});

console.log("Program End (Phase 2): Shuffle Deck Result ==>");

// Result B
printDeckContentFormatted(shuffledDeck);

console.log("Program Start (Phase 3): Perform a \"magic trick\"");
console.log("Processing...");

Object.keys(cardsDeckClone).forEach(key => {
  if (key.endsWith('Ace')) {
    const numericValue = cardsDeckClone[key];
    delete cardsDeckClone[key];
    cardsDeckClone[`${numericValue === 14 ? 'Queen' : numericValue} of ${key.split(' ')[2]}`] = numericValue;
  }
});

console.log("Converted Deck");
printDeckContentFormatted(cardsDeckClone);

const countPerValue = {};
Object.values(cardsDeckClone).forEach(numericValue => {
  const value = numericValue === 11 ? 'Jack' : numericValue === 12 ? 'Queen' : numericValue === 13 ? 'King' : numericValue === 14 ? 'Queen' : numericValue.toString();
  if (!countPerValue[value]) {
    countPerValue[value] = 1;
  } else {
    countPerValue[value]++;
  }
});

console.log("Program End (Phase 3): Magic Trick Result ==>");

// Result C
printDeckContentFormattedWithMagicTrick(countPerValue);



