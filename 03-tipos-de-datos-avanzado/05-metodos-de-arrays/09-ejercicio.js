/*
Escribe la función getAverageAge(users) que obtenga un array de objetos con la propiedad age y devuelva el promedio de age.

La fórmula de promedio es (age1 + age2 + ... + ageN) / N.

Por ejemplo:

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [ john, pete, mary ];

alert( getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28

*/

function getAverageAge(users) {

    let averageAgeUsers = users.reduce((sum, user) => sum + user.age, 0) / users.length;
    return averageAgeUsers;
}



let users = [
            { name: "John", age: 25 },
            { name: "Pete", age: 30 },
            { name: "Mary", age: 28 }
        ]; 


console.log(Math.round(getAverageAge(users)));