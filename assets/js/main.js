'use strict'
const distribucionAsientos = function() {
        let cantidadAsiento = 20;
        let columnas = 4;
        let filas = cantidadAsiento / columnas;
        let asientosHTML = "",
            numeroDeAsiento = 1;
        for (let i = 1; i <= filas; i++) {
            asientosHTML += `<div class='row' id='fila${i}'>`;

            for (let j = 0; j < columnas; j++) {
                asientosHTML += `<div class='col col-xl-2 text-center' id='${numeroDeAsiento}'>${numeroDeAsiento}</div>`;
                numeroDeAsiento += 1;
                (j == 1) ? asientosHTML += "<div class='col col-xl-1 text-center'></div>": asientosHTML += "";

            }
            asientosHTML += "</div>";

        }
        return asientosHTML;
    }
    /**/

const reserva = {
    pasajeros: [{
            nroAsiento: "39",
            nombre: "Mauricio Gamarra",
            dni: "89898998",
            estado: true
        },
        {
            nroAsiento: "3",
            nombre: "Carmen Gonzales",
            dni: "89236723",
            estado: true
        },
        {
            nroAsiento: "15",
            nombre: "Elizabeth Monroy",
            dni: "78723211",
            estado: true
        }
    ],
    dniBuscado: undefined,
    inicio: () => {
        $('#bus').html(distribucionAsientos);
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
            <div class='col col-xl-2 col-sm-2 text-center'>${elemento.nroAsiento}</div>\
            <div class='col col-xl-5 col-sm-5 text-center'>${elemento.nombre}</div>\
            <div class='col col-xl-2 col-sm-2 text-center'>${elemento.dni}</div>\
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