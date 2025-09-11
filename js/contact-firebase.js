// js/contact-firebase.js
function sendContactMessage(nombre, email, telefono, mensaje) {
    return db.collection("contactMessages").add({
        nombre,
        email,
        telefono,
        mensaje,
        fecha: new Date()
    });
}
