<<<<<<< HEAD:assets/js/main.js
'use strict'
const busMapa = function() {
        let cantidadAsiento = 40;
        let columnas = 4;
        let filas = cantidadAsiento / columnas;
        let asientosHTML = "",
            numeroDeAsiento = 1;
        for (let i = 1; i <= filas; i++) {
            asientosHTML += `<div class='row' id='fila${i}'>`;

            for (let j = 0; j < columnas; j++) {
                asientosHTML += `<div class='col col-xl-2' id='${numeroDeAsiento}'>${numeroDeAsiento}</div>`;
                numeroDeAsiento += 1;
                (j == 1) ? asientosHTML += "<div class='col col-xl-1'></div>": asientosHTML += "";

            }
            asientosHTML += "</div>";

        }
        return asientosHTML;
    }
    /** ------- -----  */

const reserva = {
    pasajeros: [{
            nroAsiento: "39",
            nombre: "Maritza Fernandes",
            dni: "89898998",
            estado: true
        },
        {
            nroAsiento: "3",
            nombre: "Carolina Baez",
            dni: "89236723",
            estado: true
        },
        {
            nroAsiento: "15",
            nombre: "Elizabeth Mamani",
            dni: "78723211",
            estado: true
        }
    ],
    dniBuscado: undefined,
    inicio: () => {
        $('#bus').html(busMapa);
        reserva.colorearAsientos();
        $('.col-xl-2').click(reserva.reservarAsiento);
        $('#guardarDatos').click(reserva.guardarDatos);
        $('#mostrarLista').click(reserva.mostrarLista);
        $('#btnBuscar').click(reserva.buscarDNI);
        $('#eliminarReserva').click(reserva.eliminarReserva);
    },
    reservarAsiento: (event) => {
        let nro = event.target.textContent;
        let clase = event.target.classList[2];
        $('#nro_Asiento').val(nro);
        if (clase != undefined) {
            let asiento = reserva.pasajeros.filter((elemento, i) => {
                return elemento.nroAsiento == nro;
            });
            $('#nombreApellido').val(asiento[0].nombre);
            $('#dni').val(asiento[0].dni);
        }
    },
    guardarDatos: () => {
        let clase = $('#' + $('#nro_Asiento').val())[0].classList[2];
        console.log(clase)
        if ($('#nro_Asiento').val() != "" && $('#nombreApellido').val() != "" && $('#dni').val() != "" && clase != 'reservado') {
            let datos = {
                nroAsiento: $('#nro_Asiento').val(),
                nombre: $('#nombreApellido').val(),
                dni: $('#dni').val(),
                estado: true
            };
            $('#alerta').html(`<div class="alert alert-success" role="alert">Guardado con Exito!!</div>`)
            reserva.pasajeros.push(datos);
            reserva.colorearAsientos();
            reserva.limpiarInputs();
        }
        if (clase == 'reservado') {
            $('#alerta').html(`<div class="alert alert-danger" role="alert">Eliminar Reserva para Agregar</div>`)
        }

    },
    mostrarLista: () => {
        let lista = "";
        reserva.pasajeros.map((elemento) => {
            lista += `<div class='row'>\
            <div class='col col-xl-2 col-sm-2'>${elemento.nroAsiento}</div>\
            <div class='col col-xl-5 col-sm-5'>${elemento.nombre}</div>\
            <div class='col col-xl-2 col-sm-2'>${elemento.dni}</div>\
            </div>`;
        });
        $('#listaPasajeros').html(lista)
    },
    buscarDNI: () => {
        let dni = $('#buscarDni').val();
        reserva.dniBuscado = reserva.pasajeros.filter((elemento, i) => {
            return elemento.dni == dni;
        });
        if (reserva.dniBuscado.length != 0) {
            $('#listaPasajeros').html(`<div class='row'>\
            <div class='col col-xl-2 col-sm-2 '>${reserva.dniBuscado[0].nroAsiento}</div>\
            <div class='col col-xl-5 col-sm-5'>${reserva.dniBuscado[0].nombre}</div>\
            <div class='col col-xl-2 col-sm-3'>${reserva.dniBuscado[0].dni}</div>\
            </div>`);
        } else {
            $('#listaPasajeros').html(`No hay Resultados`);
        }
    },
    eliminarReserva: () => {
        let nro = $('#nro_Asiento').val();
        let indice;
        reserva.pasajeros.map((elemento, i) => {
            return (nro == elemento.nroAsiento) ? indice = i : '';
        });
        //console.log(indice);
        $('#' + reserva.pasajeros[indice].nroAsiento).removeClass('reservado')
        reserva.pasajeros.splice(indice, 1);
        reserva.colorearAsientos();
        reserva.limpiarInputs();

    },
    limpiarInputs: () => {
        $('#nro_Asiento').val('')
        $('#nombreApellido').val('');
        $('#dni').val('');
    },
    colorearAsientos: () => {
        reserva.pasajeros.map((elemento, i) => {
            return $('#' + elemento.nroAsiento).addClass('reservado');
        });
    }
}
$(document).ready(reserva.inicio);
=======
'use strict';
/// asientos
class Bus {
    constructor() {
        this.pasajeros = [];
    }
    agregarPasajero(nombre, dni, numeroAsiento) {
        let pasajero = {
            nombre: nombre,
            dni: dni,
            numeroAsiento: numeroAsiento,
        }
        this.pasajeros.push(pasajero);
        return pasajero;

    }
    mostrar(pasajero) {
        let fichaPasajero =
            `
            <div class = "pasajero">
                <h3 class="text-uppercase">${pasajero.nombre}</h3>
                <strong>Tech Skills:</strong> ${pasajero.dni}%<br>
                <strong>Life Skills:</strong> ${pasajero.numeroAsiento}%<br>
                <strong>Status:</strong> Active<br>
            </div>
        `
        return fichaPasajero;
    }
    mostrarListaPasajero(pasajeros) {
        return pasajeros.map(this.mostrar);
    }
}
}

// funciones 
>>>>>>> refs/remotes/origin/master:main.js

function buscar(asientos, dni) {
    for (var i = 0; i < asientos.length; i++) {
        if (asientos[i] != undefined)
            if (asientos[i].dni == dni)
                return asientos[i];
    }
    return '';
}

function mostrar(asientos) {
    var s1 = "",
        s2 = "";
    for (var i = 0; i < asientos.length; i++) {
        var e = (asientos[i] != undefined) ? '*' : '';
        if (i % 2 == 0)
            s1 += (i + 1) + "[" + e + "] ";
        else
            s2 += (i + 1) + "[" + e + "] ";
    }
    return "\n" + s1 + "\n" + s2 + "\n";
}

function reserva() {
    var N = 10; // Número de asientos
    var asientos = [];
    for (var i = 0; i < N; i++) {
        asientos[i] = undefined;
    }
    var mensaje = "0: Salir\n" +
        "1: Reservar  asiento\n" +
        "2: Liberar asiento \n" +
        "3: Seleccionar asiento \n" +
        "4: Buscar por DNI \n";

    var option = 0;
    while (true) {
        var str = mostrar(asientos) + mensaje + " >> ingrese opcion:";
        option = parseInt(prompt(str));
        if (option == 0) {
            break;
        } else if (option == 1) {
            str = "seleccione asiento: " + mostrar(asientos);
            var nro = parseInt(prompt(str));
            if (nro > 0 && nro <= N) {
                var name = prompt("nombre del pasajero");
                var id = parseInt(prompt("dni del pasajero"));
                asientos[nro - 1] = {
                    nombre: name,
                    dni: id
                };
            }
        } else if (option == 2) {
            str = "seleccione asiento: " + mostrar(asientos);
            var nro = parseInt(prompt(str));
            if (nro > 0 && nro <= N) {
                asientos[nro - 1] = undefined;
            }
        } else if (option == 3) {
            str = "seleccione asiento: " + mostrar(asientos);
            var nro = parseInt(prompt(str));
            if (nro > 0 && nro <= N) {
                str = mostrar(asientos) +
                    "Nombre del pasajero: " + asientos[nro - 1].nombre +
                    "DNI del pasajero: " + asientos[nro - 1].dni;

                alert(str);
            }
        } else if (option == 4) {
            str = "ingrese dni: ";
            var dni = parseInt(prompt(str));

            alert("usuario:" + buscar(asientos, dni).nombre);
        }

    }
    imprimir(asientos);
}

reserva();

function buscar(asientos, dni) {
    for (var i = 0; i < asientos.length; i++) {
        if (asientos[i] != undefined)
            if (asientos[i].dni == dni)
                return asientos[i];
    }
    return '';
}

function mostrar(asientos) {
    var s1 = "",
        s2 = "";
    for (var i = 0; i < asientos.length; i++) {
        var e = (asientos[i] != undefined) ? '*' : '';
        if (i % 2 == 0)
            s1 += (i + 1) + "[" + e + "] ";
        else
            s2 += (i + 1) + "[" + e + "] ";
    }
    return "\n" + s1 + "\n" + s2 + "\n";
}

function reserva() {
    var N = 10; // Número de asientos
    var asientos = [];
    for (var i = 0; i < N; i++) {
        asientos[i] = undefined;
    }
    var mensaje = "0: Salir\n" +
        "1: Reservar  asiento\n" +
        "2: Liberar asiento \n" +
        "3: Seleccionar asiento \n" +
        "4: Buscar por DNI \n";

    var option = 0;
    while (true) {
        var str = mostrar(asientos) + mensaje + " >> ingrese opcion:";
        option = parseInt(prompt(str));
        if (option == 0) {
            break;
        } else if (option == 1) {
            str = "seleccione asiento: " + mostrar(asientos);
            var nro = parseInt(prompt(str));
            if (nro > 0 && nro <= N) {
                var name = prompt("nombre del pasajero");
                var id = parseInt(prompt("dni del pasajero"));
                asientos[nro - 1] = {
                    nombre: name,
                    dni: id
                };
            }
        } else if (option == 2) {
            str = "seleccione asiento: " + mostrar(asientos);
            var nro = parseInt(prompt(str));
            if (nro > 0 && nro <= N) {
                asientos[nro - 1] = undefined;
            }
        } else if (option == 3) {
            str = "seleccione asiento: " + mostrar(asientos);
            var nro = parseInt(prompt(str));
            if (nro > 0 && nro <= N) {
                str = mostrar(asientos) +
                    "Nombre del pasajero: " + asientos[nro - 1].nombre +
                    "DNI del pasajero: " + asientos[nro - 1].dni;

                alert(str);
            }
        } else if (option == 4) {
            str = "ingrese dni: ";
            var dni = parseInt(prompt(str));

            alert("usuario:" + buscar(asientos, dni).nombre);
        }

    }
    imprimir(asientos);
}

reserva();