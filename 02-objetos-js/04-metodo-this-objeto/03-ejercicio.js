/*
Hay un objeto ladder que permite subir y bajar:

let ladder = {
  step: 0,
  up() {
    this.step++;
  },
  down() {
    this.step--;
  },
  showStep: function() { // muestra el peldaño actual
    alert( this.step );
  }
};
Si ahora necesitamos hacer varios llamados en secuencia, podemos hacer algo como esto:

ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
Modifica el código de “arriba” up, “abajo” down y “mostrar peldaño” showStep para hacer los llamados encadenables. Así:

ladder.up().up().down().showStep().down().showStep(); // muestra 1 luego 0
Tal enfoque es ampliamente usado en librerías JavaScript.
*/

let ladder = {
    step: 0,
    up() {
        this.step++;
        return this; // esto me devuelve el objeto, al hacer la proxima llamada encadenada, ya se llamó al objeto.
    },
    down() {
        this.step--;
        return this;
    },
    showStep: function () {
        console.log(this.step);
        return this;
    }
};

console.log(ladder.up().up().down().showStep().down().showStep());

/* EXPLICACIÓN 
el return this en si es el objecto , para llamara a un metodo loq ue teniamos que hacer era llamar al objecto.method(), pero cone l return this paracticamente ya llamo al object , por eso en la llamada hace esto object.method1(),method2() , por que no hace un llamado de object entre metodos, por que solo con llamar al method1() ya hizo un return del objeto y solo queda llamar al metodo que deses seguido del anterior.
*/