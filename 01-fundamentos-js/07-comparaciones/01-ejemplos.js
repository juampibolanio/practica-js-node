alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true

alert( '2' > 1 ); // true, la cadena '2' se convierte en el número 2
alert( '01' == 1 ); // true, la cadena '01' se convierte en el número 1

alert( true == 1 ); // true
alert( false == 0 ); // true

let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert( a == b ); // true!


// igualdad estricta 

alert( 0 === false ); // falso, porque los tipos son diferentes

alert( null === undefined ); // false

// otros ejemplos

alert( null > 0 ); /// (1) false
alert( null == 0 ); /// (2) false
alert( null >= 0 ); // (3) true