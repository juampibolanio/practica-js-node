/*
Anagramas son palabras que tienen el mismo número de letras, pero en diferente orden.
Por ejemplo:

nap - pan
ear - are - era
cheaters - hectares - teachers
Escriba una función aclean(arr) que devuelva un array limpio de anagramas.

Por ejemplo:
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" o "PAN,cheaters,era"
*/

function aclean(arr) {

    let map = new Map();

    for (let word of arr) {
        
        let sorted = word.toLowerCase().split('').sort().join(''); 
        map.set(sorted, word);
    }

    return Array.from(map.values());
}


let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];