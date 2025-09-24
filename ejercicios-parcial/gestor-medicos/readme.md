🏥 Sistema de Gestión de Turnos Médicos

Este ejercicio es una práctica integral que combina POO, asincronía, validaciones y algoritmos en JavaScript. El objetivo es implementar un sistema que administre turnos en una clínica.

Requisitos
1. Clase Turno

Propiedades privadas:

#id, #paciente, #doctor, #especialidad, #estado.

Constructor que reciba esos valores (por defecto el estado será "pendiente").

Método actualizarEstado(estado) que valide los estados permitidos:
"pendiente", "asignado", "enConsulta", "finalizado", "cancelado".

Si se intenta asignar un estado inválido, debe lanzar un error.

2. Clase GestorTurnos

Debe incluir una propiedad privada #turnos = [] y los siguientes métodos:

agregarTurno(turno)

Agrega un turno validando que no esté duplicado por id.

agruparPorEstado()

Devuelve un objeto con los turnos agrupados por su estado.

asignarTurnos(doctores)

Distribuye los turnos pendientes entre los doctores con un algoritmo round-robin.

Cada doctor puede tener un máximo de 5 turnos.

Los turnos excedentes van a listaEspera.

contadorTurnosPorPaciente(paciente)

Devuelve un closure que lleve el conteo de turnos pedidos por un paciente específico.

validarEntradaTurno(obj)

Recibe un objeto genérico (como si viniera de una API).

Usa coerción de tipos (Number, String, Boolean).

Si falta algún campo obligatorio (id, paciente, doctor, especialidad), lanza Error("Datos incompletos").

Retorna un objeto Turno.

priorizarTurnos(pacientesVIP, especialidadesCriticas)

Clasifica turnos en 3 niveles:

Alta: pacientes VIP.

Media: especialidades críticas (ej: "Cardiología").

Baja: el resto.

Devuelve un arreglo ordenado con alta prioridad primero, luego media y al final baja.

Extra: si hay más de 3 turnos de alta prioridad, suspender la asignación de los de baja.

3. Asincronía

Simular la llegada de turnos nuevos con setInterval: cada 5 segundos se genera un turno aleatorio.

Si en cualquier momento hay más de 15 turnos pendientes, mostrar en consola:

⚠️ Demasiados turnos sin asignar


Simular que 3 turnos "enConsulta" se finalizan en paralelo usando Promise.all con setTimeout de distinta duración.

4. Comparación == vs ===

Crear dos turnos con id = 10 y id = "10".

Mostrar en consola la diferencia entre usar == y ===.