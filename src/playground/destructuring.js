// Object Destructuring

const person = {
    name: 'Andrew',
    age: 26,
    location: [
        'Seoul',
        22
    ]
};

const person2 = [
    {
    name: 'Andrew',
    age: 27
    }
];


const  [city, zip]  = person.location; 
console.log(`city is ${city}, zip: ${zip}`);

const [{ name: naming, age }] = person2; 
console.log(`${naming} ${age}`);

// const { name, age } = person;
// console.log(`${name} is ${age}.`);

// console.log(`It's ${person.location.temp} in ${person.location.city}`);

// const { city, temp: temperature } = person.location; 
// console.log(`It's ${temperature} in ${city}`);

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// const { name: publisherName = 'Self-Published' } = book.publisher;

// console.log(publisherName); 

// Array Destructuring

// const address = ['Aju Street', 'Jamsil', 'Seoul', '55572']; ;

// const [, city, , zip] = address; 

// console.log(`You are in ${city} ${zip}.`);

// const item=['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

// const [menu, , grande] = item; 

// console.log(`A grande ${menu} costs ${grande}`);