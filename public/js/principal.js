let url_ultima_invocada = '';
const numFilasPorPagina = 10;
let paginaActual = 1;
let datos = [];
let datosOriginales = [];
let paginacionActual = 1;
let cerrando_sesion = 0;

// Función para cargar el contenido dinámico desde el servidor
function cargarContenido(url) {
    // Realizar una solicitud AJAX al servidor para obtener el contenido del archivo EJS
    fetch(url)
      .then(response => response.text())
      .then(data => {
        // Actualizar el contenido del div con id 'contenido-dinamico'
        document.getElementById('contenido-dinamico').innerHTML = data;
        let tiene_busqueda = false;
        if (url.indexOf('cuentas_whatsapp') !== -1 ) {
            tiene_busqueda = true;
        }
        //Código para funcionalidad de búsqueda en tablas:
        if (tiene_busqueda) {
            const inputBusqueda = document.getElementById('search-input');
            const tabla = document.getElementById('miTabla');
            const paginacion = document.getElementById('paginacion');
            //console.log('Llegue!');
            inputBusqueda.addEventListener('keyup', function() {
                const textoBusqueda = inputBusqueda.value.toLowerCase();                
                //console.log(textoBusqueda);
                if (textoBusqueda.trim() === '') {
                  datos = [...datosOriginales]; // Restaurar datos originales si el campo de búsqueda está vacío
                } else {
                  // Filtrar los datos según el texto de búsqueda
                  //datos = datosOriginales.filter(fila => fila.some(celda => celda.includes(textoBusqueda)));
                  datos = datosOriginales.filter(fila => fila.some(celda => {
                        /*console.log('**********************');
                        console.log(celda.contenidoTexto);
                        console.log(celda.contenidoTexto.includes(textoBusqueda));*/
                        return celda.contenidoTexto.includes(textoBusqueda);
                  }));
                }
                mostrarDatosEnTabla(tabla);
                crearBotonesPaginacion(tabla, paginacion);
              });
              
              obtenerDatosTabla(tabla);
              mostrarDatosEnTabla(tabla);
              crearBotonesPaginacion(tabla, paginacion);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

document.addEventListener('DOMContentLoaded', async (req, res) => {
    // Obtener los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id_token = urlParams.get('id_token');
    const id_cliente = urlParams.get('id_cliente');
    try {
        const response = await fetch('/login_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_cliente, id_token })
        });

        const data = await response.json();
        
        if (data.message === 'token invalido') {
            window.location.href = `../index.html`;
        } else {
            /*usuario = data.usuario;
            monto = data.monto;
            moneda = data.moneda;
            const usuario_usuario = document.getElementById('usuario_usuario');
            const usuario_monto = document.getElementById('usuario_monto');
            const usuario_moneda = document.getElementById('usuario_moneda');

            usuario_usuario.innerHTML = usuario;
            usuario_monto.innerHTML = monto;
            usuario_moneda.innerHTML = moneda;
    
            const logout = document.getElementById('logout');
            logout.addEventListener('click', function(event) {
                event.preventDefault();
                url_ultima_invocada = `${this.getAttribute('href')}?id_cliente=${encodeURIComponent(id_cliente)}id_token=${encodeURIComponent(id_token)}`;
                fetch(url_ultima_invocada);
                window.location.href = `/`;
            });*/

            // Carga el menú de actividad de clientes al inicio:
            url_ultima_invocada = `/principal?id_cliente=${encodeURIComponent(id_cliente)}&id_token=${encodeURIComponent(id_token)}`;
            cargarContenido(url_ultima_invocada);
        }
    } catch (error) {
        window.location.href = `../index.html`;
    }
});

function cargarContenidoModal(url) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      document.getElementById('modal-contenido').innerHTML = data;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function abrirModal(opcion = 0, par1 = '', par2 = '', par3 = '') {
  const modal = document.getElementById('miModal');
  let id_sesion_bot = '';
  let numero_telefono = '';
  let url = '';
  modal.style.display = 'block';
  switch (opcion)
  {
      case 0:
          console.log('Modal de Prueba');
          break;
      case 1:
          id_sesion_bot = par1; 
          numero_telefono = par2; 
          //console.log('Sesiones Bot');
          //console.log('Id sesion: ' + id_sesion_bot);
          url = `/sesiones_bots_cerrar?id_sesion_bot=${encodeURIComponent(id_sesion_bot)}&numero_telefono=${encodeURIComponent(numero_telefono)}`;
          cargarContenidoModal(url);
          break;
      default:
          console.log('Modal Vacío');
  }
}

function cerrarModal() {
  const modal = document.getElementById('miModal');
  modal.style.display = 'none';
  document.getElementById('modal-contenido').innerHTML = '';
  cargarContenido(url_ultima_invocada);
}

/*********************Búsqueda en Tablas***************************/
function obtenerDatosTabla(tabla) {
    datos = [];
    datosOriginales = [];
    const filas = tabla.getElementsByTagName('tr');
    for (let i = 1; i < filas.length; i++) {
      const fila = filas[i];
      const celdas = fila.getElementsByTagName('td');
      const filaDatos = [];
      for (let j = 0; j < celdas.length; j++) {
        //filaDatos.push(celdas[j].textContent.trim().toLowerCase());
        //filaDatos.push(celdas[j].innerHTML);
        const contenidoHTML = celdas[j].innerHTML.trim();
        const contenidoTexto = celdas[j].textContent.trim().toLowerCase();
        // Agregar el contenido HTML y el texto al arreglo de datos
        filaDatos.push({ contenidoHTML, contenidoTexto });
      }
      datos.push(filaDatos);
      datosOriginales.push(filaDatos);
    }
  }
  
  function mostrarDatosEnTabla(tabla) {
    // Obtener el cuerpo de la tabla (tbody)
    let tbody = tabla.getElementsByTagName('tbody')[0];
    // Eliminar el contenido del cuerpo de la tabla
    tbody.innerHTML = '';
    
    const inicio = (paginaActual - 1) * numFilasPorPagina;
    const fin = paginaActual * numFilasPorPagina;
  
    for (let i = inicio; i < fin && i < datos.length; i++) {
      const filaActual = datos[i];
      const fila = tbody.insertRow();
      for (let j = 0; j < filaActual.length; j++) {
        const celda = fila.insertCell();
        celda.textContent = filaActual[j].contenidoTexto;
        celda.innerHTML = filaActual[j].contenidoHTML;
      }
    }
  }
 
function crearBotonesPaginacion(tabla, paginacion) {
    const totalPaginas = Math.ceil(datos.length / numFilasPorPagina);
    paginacion.innerHTML = '';
  
    for (let i = 1; i <= totalPaginas; i++) {
        const boton = document.createElement('button');
        boton.textContent = i;
        boton.id = 'boton_pagina_' + i;

        boton.addEventListener('click', function() {
            paginaActual = i;
            mostrarDatosEnTabla(tabla);

            boton.classList.add('active');
            const btn_actual = document.getElementById('boton_pagina_' + paginacionActual);
            btn_actual.classList.remove('active');
            paginacionActual = paginaActual;
        });
        paginacion.appendChild(boton);
    }
}

/************************************************* */

const cerrar_Sesion = async (id_cliente, id_token) => {
  if (cerrando_sesion == 1) {
      alert('Por Favor Aguardar. Se está Procesando la Solicitud.');
      return;
  }
  cerrando_sesion = 1;
  try {
        const response = await fetch(`/logout`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'},
          body: JSON.stringify({ id_cliente, id_token })
      });
      cerrando_sesion = 0;
      window.location.href = `/`;
  } catch (error) {
      cerrando_sesion = 0;
      window.location.href = `/`;
  }
};

const cerrar_Sesion_Token_Invalido = async () => {
      window.location.href = `/`;
};