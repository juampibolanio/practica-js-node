/*
Existen 6 métodos estáticos de la clase Promise:

Promise.all(promises) – espera que todas las promesas se resuelvan y devuelve un array de sus resultados. Si cualquiera es rechazada se vuelve el error de Promise.all y los demás resultados son ignorados.
Promise.allSettled(promises) (método recientemente añadido) – espera que toda las promesas respondan y devuelve sus resultados como un array de objetos con:
status: "fulfilled" o "rejected"
value (si fulfilled) o reason (si rejected).
Promise.race(promises) – espera a la primera promesa que responda y aquel resultado o error se vuelve su resultado o error.
Promise.any(promises) (método recientemente añadido) – espera por la primera promesa que se cumpla y devuelve su resultado. Si todas las promesas son rechazadas, AggregateError se vuelve el error de Promise.any.
Promise.resolve(value) – crea una promesa resuelta con el “value” dado.
Promise.reject(error) – crea una promesa rechazada con el “error” dado.
Promise.all es probablemente el más común en la práctica.


*/