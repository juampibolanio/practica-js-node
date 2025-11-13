const crypto = require("crypto");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");

let bookings = [];

function getAll() {
    return bookings;
}

function getById(id) {
    const booking = bookings.find(b => b.id == id);

    if (!booking) {
        throw new NotFoundError(`No se encontró ninguna reserva con el id ${id}`);
    }

    return booking;
}

function create(data) {
    const exists = bookings.find(b =>
        b.field === data.field &&
        b.date === data.date &&
        b.time === data.time
    );

    if (exists) {
        throw new ConflictError("Ya existe una reserva con ese horario.");
    }

    const newBooking = {
        id: crypto.randomUUID(),
        ...data,
    };

    bookings.push(newBooking);
    return newBooking;
}

function update(id, data) {
    const index = bookings.findIndex(b => b.id == id);

    if (index === -1) {
        throw new NotFoundError(`No se encontró la reserva con el id ${id}`);
    }

    const exists = bookings.find(b =>
        b.id !== id &&
        b.field === data.field &&
        b.date === data.date &&
        b.time === data.time
    );

    if (exists) {
        throw new ConflictError("Ya existe una reserva con esos datos.");
    }

    const updatedBooking = {
        id,
        ...data,
    };

    bookings[index] = updatedBooking;

    return updatedBooking;
}

function patch(id, data) {
    const booking = bookings.find(b => b.id == id);

    if (!booking) {
        throw new NotFoundError(`No se encontró la reserva con el id ${id}`);
    }

    const updatedData = { ...booking, ...data };

    const exists = bookings.find(b =>
        b.id !== id &&
        b.field === updatedData.field &&
        b.date === updatedData.date &&
        b.time === updatedData.time
    );

    if (exists) {
        throw new ConflictError("Ya existe una reserva en esa cancha, fecha y horario.");
    }

    const updatedBooking = { ...updatedData };
    const index = bookings.findIndex(b => b.id == id);
    bookings[index] = updatedBooking;

    return updatedBooking;
}

function remove(id) {
    const index = bookings.findIndex(b => b.id == id);

    if (index === -1) {
        throw new NotFoundError(`No se encontró la reserva con la id ${id}`);
    }

    const bookingDeleted = bookings[index];
    bookings.splice(index, 1);
    return bookingDeleted;
}

module.exports = { getAll, getById, create, update, patch, remove };
