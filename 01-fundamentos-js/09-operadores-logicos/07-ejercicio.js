/*
Escribe una condición if para comprobar que age NO está entre 14 y 90 inclusive.

Crea dos variantes: la primera usando NOT !, y la segunda sin usarlo.
*/

let age = 16;

if (!(age >= 14 && age <= 90)) {
    console.log("no está")
}

if ((age >= 14) || (age <= 90)) {
    
}