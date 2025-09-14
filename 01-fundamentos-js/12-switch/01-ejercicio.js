/*
Escribe el código utilizando if..else que corresponda al siguiente switch:

switch (navegador) {
  case 'Edge':
    alert( "¡Tienes Edge!" );
    break;

  case 'Chrome':
  case 'Firefox':
  case 'Safari':
  case 'Opera':
    alert( 'Esta bien, soportamos estos navegadores también' );
    break;

  default:
    alert( '¡Esperamos que esta página se vea bien!' );
}
*/

if (navegador === 'Edge') {
    alert("¡Tienes Edge!");
} 
else if (navegador === 'Chrome' 
    || navegador === 'Firefox' 
    || navegador === 'Safari' 
    || navegador === 'Opera') {
    alert("Está bien, soportamos estos navegadores tambien");
}
else {
    alert("¡Esperamos que esta pagina se vea bien!");
}

// se podría utilizar la comparación "==", pero con la estricta (===) también funciona.