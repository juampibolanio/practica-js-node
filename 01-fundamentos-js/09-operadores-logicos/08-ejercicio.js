/*
¿Cuáles de estos alerts va a ejecutarse?

¿Cuáles serán los resultados de las expresiones dentro de if(...)?

if (-1 || 0) alert( "primero" );
if (-1 && 0) alert( "segundo" );
if (null || -1 && 1) alert( "tercero" );
*/

if (-1 || 0) alert( "primero" ); // -1 y despues alert
if (-1 && 0) alert( "segundo" ); // 0 y no se ejecuta alert
if (null || -1 && 1) alert( "tercero" ); // null y se ejecuta alert