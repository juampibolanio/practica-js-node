/*
Escribe una función getWeekDay(date) para mostrar el día de la semana en formato corto: ‘MO’, ‘TU’, ‘WE’, ‘TH’, ‘FR’, ‘SA’, ‘SU’.

Por ejemplo:

let date = new Date(2012, 0, 3);  // 3 Jan 2012
alert( getWeekDay(date) );        // debería mostrar "TU"
*/

function getWeekDay(date) {

    let daysWeek = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

    return daysWeek[date.getDay()];
}

let date = new Date(2014, 0, 3)
console.log(getWeekDay(date));