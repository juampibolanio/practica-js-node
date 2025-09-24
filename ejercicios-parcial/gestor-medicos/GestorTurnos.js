const Turno = require('./Turno');

class GestorTurnos {
    #turnos = [];
    listaEspera = [];

    agregarTurno(turno) {

        const duplicado = this.#turnos.some((tur) => tur.getId() === turno.getId());

        if (duplicado) {
            throw new Error("La id del turno ingresado ya existe en la lista");
        }
        this.#turnos.push(turno);
    }

    agruparPorEstado() {
        return this.#turnos.reduce((acc, turno) => {

            acc[turno.getEstado()] ??= [];
            acc[turno.getEstado()].push(turno);

            return acc;

        }, { pendiente: [], asignado: [], enConsulta: [], finalizado: [], cancelado: []});

    }

    asignarTurnos(doctores) {

        let idx = 0;

        for (const tur of this.#turnos.filter(t => t.getEstado() === "pendiente")) {
            
            const doctor = doctores[idx % doctores.length]; 

            if (!tur.getDoctor()) {
                tur.setDoctor(doctor);
            }

            const asignados = this.#turnos.filter(t => t.getDoctor() === doctor && t.getEstado() !== "cancelado");

            if (asignados.length > 5) {
                tur.actualizarEstado("pendiente");
                this.listaEspera.push(tur);
            } else {
                tur.actualizarEstado("asignado");
            }
            idx++;
        }
    }

    contadorTurnosPorPaciente(paciente) {
        let contador = 0;
        return () => {
            contador++;
            console.log(`El paciente ${paciente} hizo ${contador} turnos.`);
            return contador;
        }
    }

    validarEntradaTurno(obj) {

        if (!obj.id || !obj.paciente || !obj.doctor || !obj.especialidad) {
            throw new Error("Hay campos incompletos.");
        }

        return new Turno(
            Number(obj.id),
            String(obj.paciente),
            String(obj.doctor),
            String(obj.especialidad),
            obj.estado ? String(obj.estado) : "pendiente"
        );
    }

    priorizarTurnos(pacientesVIP, especialidadesCriticas) {

        let alta = [];
        let media = [];
        let baja = [];

        for (const tur of this.#turnos) {
            if (pacientesVIP.includes(tur.getPaciente())) {
                alta.push(tur);
            } 
            else if (especialidadesCriticas.includes(tur.getEspecialidad())) {
                media.push(tur);
            } else {
                baja.push(tur);
            }
        }

        if (alta.length > 3) {
            console.log("Hay demasiados turnos de alta prioridad, se suspenderán los de baja.");
            return [...alta, ...media];
        }

        return [...alta, ...media, ...baja];
    }

}

module.exports = GestorTurnos;