class Turno {
    #id;
    #paciente;
    #doctor;
    #especialidad;
    #estado;

    constructor(id, paciente, doctor, especialidad, estado = "pendiente") {
        this.#id = id;
        this.#paciente = paciente;
        this.#doctor = doctor;
        this.#especialidad = especialidad;
        this.#estado = estado;
    }

    actualizarEstado(estado) {
        const estadosValidos = ["pendiente", "asignado", "enConsulta", "finalizado", "cancelado"];

        if (!estadosValidos.includes(estado)) {
            throw new Error("El estado introducido no es válido");
        }
        this.#estado = estado;
    }

    getId() {
        return this.#id;
    }

    getPaciente() {
        return this.#paciente;
    }

    getDoctor() {
        return this.#doctor;
    }

    setDoctor(doctor) {
        this.#doctor = doctor;
    }

    getEspecialidad() {
        return this.#especialidad;
    }

    getEstado() {
        return this.#estado;
    }
}

module.exports = Turno;