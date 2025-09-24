const Turno = require('./Turno');
const GestorTurnos = require('./GestorTurnos');

const pacientes = ["Pedro", "José", "Maria", "Lucia"];
const doctores = ["Juan", "Lucas", "Sofia"];
const especialidades = ["Cardiologia", "Hematologia", "Otro"]

const gestor = new GestorTurnos();

function indexAlAzar(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

function crearTurno() {
    return new Turno(Math.floor(Math.random() * 1000),
        indexAlAzar(pacientes),
        indexAlAzar(doctores),
        indexAlAzar(especialidades));
}

const intervalId = setInterval(() => {

    let nuevoTurno = crearTurno();

    try {
        console.log(`Ha llegado un nuevo turno ${nuevoTurno.getPaciente()}`);
        gestor.agregarTurno(nuevoTurno);
        gestor.asignarTurnos(doctores);

        let pendientes = gestor.agruparPorEstado().pendiente.length;

        if (pendientes > 15) {
            console.log("Demasiados turnos sin asignar");
            clearInterval(intervalId);
        }

    } catch (error) {
        console.log("Ha ocurrido un error.");
    }

}, 5000);

function finalizarTurno(turno, ms) {

    return new Promise((resolve) => {
        setTimeout(() => {
            turno.actualizarEstado("finalizado");
            resolve(turno);
        }, ms);
    })
}


async function procesarTurnos() {
    
    const turnosEnConsulta = gestor.agruparPorEstado().enConsulta.slice(0, 3);

    if (turnosEnConsulta.length == 0) {
        console.log("No hay turnos en consulta ahora mismo");
        return;
    }

    const terminarAtencion = await Promise.all(
        turnosEnConsulta.map((turno) => finalizarTurno(turno, Math.floor(Math.random() * 1000)))
    )

    console.log(`Turnos finalizados ${turnosEnConsulta.map(turno => turno.getPaciente())}`);
}

setInterval(() => {
    procesarTurnos();
}, 7000);