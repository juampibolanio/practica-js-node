let value = true;
alert(typeof value); // boolean

value = String(value); // ahora value es el string "true"
alert(typeof value); // string

//--------------------------
alert( "6" / "2" ); // 3, los strings son convertidos a números

// ---------------------
let str = "123";
alert(typeof str); // string

let num = Number(str); // se convierte en 123

alert(typeof num); // number

//----------------

alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (error al leer un número en "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0

//-------------------------

alert( 1 + '2' ); // '12' (string a la derecha)
alert( '1' + 2 ); // '12' (string a la izquierda)

//-------------------------

alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("hola") ); // true
alert( Boolean("") ); // false

alert( Boolean("0") ); // true
alert( Boolean(" ") ); // sólo espacios, también true (cualquier string no vacío es true)