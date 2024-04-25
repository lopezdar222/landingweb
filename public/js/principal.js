let url_ultima_invocada = '';
const numFilasPorPagina = 10;
let paginaActual = 1;
let datos = [];
let datosOriginales = [];
let paginacionActual = 1;
let cerrando_sesion = 0;
let cambiando_contraseña = 0;
let desbloqueando_usuario = 0;
let cargando_fichas = 0;
let retirando_fichas = 0;
let ws = null;

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
        if (url.indexOf('menu=chat') !== -1 ) {
          scrollToBottom();
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
            //Inicializar cliente Websocket********************************/
            ws = new WebSocket('wss://paneleslanding.com:8080');

            ws.onopen = function(event) {
                enviarMensaje('', id_cliente);
            };
            
            // Evento cuando se recibe un mensaje del servidor
            ws.onmessage = function(event) {
                const data = JSON.parse(event.data);
                //alert(`Alerta = ${data.alerta}`);
                if (data.alerta == 'chat') { 
                  //alert('Actualizar Chats');
                  cargarContenidoChats(id_cliente, '', true);
                }
                // Aquí puedes manipular el mensaje recibido, por ejemplo, mostrarlo en la página
            };
            /******************************************************************/
            // Carga el menú de actividad de clientes al inicio:
            url_ultima_invocada = `/principal?id_cliente=${encodeURIComponent(id_cliente)}&id_token=${encodeURIComponent(id_token)}`;
            cargarContenido(url_ultima_invocada);
        }
    } catch (error) {
        window.location.href = `../index.html`;
    }
});
//Inicializar cliente Websocket********************************/

function enviarMensaje(mensaje, id_cliente) {
  const message = { 
              es_cliente: 1,
              ws_cliente: id_cliente,
              id_cliente : id_cliente,
              alerta : mensaje
  };
  ws.send(JSON.stringify(message));
}
/******************************************************************/

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

const cambiarContraseña = async (id_cliente, id_token) => {
  if (cambiando_contraseña == 1) {
      alert('Por Favor Aguardar. Se está Procesando la Solicitud.');
      return;
  }
  cambiando_contraseña = 1;
  let mgsResultado = '';
  let mgsResultadoMensaje = '';
  let url = '';
  const msgUsuario = document.getElementById('msgUsuario');
  const contra1 = document.getElementById('contra1');
  const contra2 = document.getElementById('contra2');

  if (contra1.value == '') {
      msgUsuario.innerHTML = 'Por favor, completar Contraseña!';
      cambiando_contraseña = 0;
      return;
  }
  if (contra2.value == '') {
      msgUsuario.innerHTML = 'Por favor, completar Validación de Contraseña!';
      cambiando_contraseña = 0;
      return;
  }
  if (contra1.value != contra2.value) {
      msgUsuario.innerHTML = 'Los valores ingresados no son iguales!';
      cambiando_contraseña = 0;
      return;
  }
  try {
        const contrasena = contra1.value;
        const response = await fetch(`/cambiar_contrasena`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'},
          body: JSON.stringify({  id_cliente, 
                                  id_token, 
                                  contrasena })
        });
        if (response.ok) {
          const data = await response.json();
          mgsResultado = data.resultado;
          mgsResultadoMensaje = data.mensaje;
          //alert(mgsResultadoMensaje);
          cambiando_contraseña = 0;
          url = `/menu_mensaje?id_cliente=${id_cliente}&id_token=${id_token}&resultado=${mgsResultado}&mensaje=${mgsResultadoMensaje}`;
          document.getElementById('modal-contenido').innerHTML = '';
          cargarContenido(url);
        } else {
          cambiando_contraseña = 0;
          msgUsuario.innerHTML = 'Disculpas, ha ocurrido un error. Por favor, reintentar la acción.';
        }
  } catch (error) {
      cambiando_contraseña = 0;
      msgUsuario.innerHTML = 'Disculpas, ha ocurrido un error. Por favor, reintentar la acción.';
  }
};

const desbloquearUsuario = async (id_cliente, id_token) => {
  if (desbloqueando_usuario == 1) {
      alert('Por Favor Aguardar. Se está Procesando la Solicitud.');
      return;
  }
  desbloqueando_usuario = 1;
  const msgUsuario = document.getElementById('msgUsuario');

  try {
        const response = await fetch(`/desbloquear_usuario`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'},
          body: JSON.stringify({  id_cliente, 
                                  id_token })
        });
        if (response.ok) {
          const data = await response.json();
          msgUsuario.innerHTML = data.mensaje;
        } else {
          msgUsuario.innerHTML = 'Disculpas, ha ocurrido un error. Por favor, reintentar la acción.';
        }
        cambiando_contraseña = 0;
  } catch (error) {
      cambiando_contraseña = 0;
      msgUsuario.innerHTML = 'Disculpas, ha ocurrido un error. Por favor, reintentar la acción.';
  }
};

const cargarFichas = async (id_cliente, id_token, id_cuenta_bancaria, minimo_carga, bono_carga_1, bono_carga_perpetua, cargas) => {
  if (cargando_fichas == 1) {
      alert('Por Favor Aguardar. Se está Procesando la Solicitud.');
      return;
  }
  cargando_fichas = 1;
  let mgsResultado = '';
  let mgsResultadoMensaje = '';
  let url = '';
  let bono = 0;
  const msgUsuario = document.getElementById('msgUsuario');
  const titular = document.getElementById('titular');
  const importe = document.getElementById('importe');
  // Expresión regular para verificar si es un número entero
  var patron_nro_entero = /^\d+$/;

  if (importe.value == '') {
    msgUsuario.innerHTML = 'Por favor, completar el Importe!';
    cargando_fichas = 0;
    return;
  }
  // Verificar si el valor coincide con el patrón
  if (!patron_nro_entero.test(importe.value)) {
    msgUsuario.innerHTML = 'Por favor, Ingresar Sin Centavos!';
    cargando_fichas = 0;
    return;
  }
  // Verificar si el valor supera el mínimo de carga
  if (importe.value < minimo_carga) {
    msgUsuario.innerHTML = 'Por favor, Ingresar un Importe Mayor o igual al Mínimo de Carga!';
    cargando_fichas = 0;
    return;
  }
  if (titular.value == '') {
    msgUsuario.innerHTML = 'Por favor, completar el Titular!';
    cargando_fichas = 0;
    return;
  }
  if (cargas == 0) {
    if (bono_carga_1 > 0) {
      bono = Math.ceil(Number(importe.value) * bono_carga_1 / 100);
    }
  } else {
    if (bono_carga_perpetua > 0) {
      bono = Math.ceil(Number(importe.value) * bono_carga_perpetua / 100);
    }
  }
  try {
        const solicitud_titular = titular.value;
        const solicitud_importe = importe.value;
        const response = await fetch(`/cargar_fichas`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'},
          body: JSON.stringify({  id_cliente, 
                                  id_token, 
                                  solicitud_titular,
                                  solicitud_importe,
                                  id_cuenta_bancaria,
                                  bono })
        });
        if (response.ok) {
          const data = await response.json();
          mgsResultado = data.resultado;
          mgsResultadoMensaje = data.mensaje;
          //alert(mgsResultadoMensaje);
          cargando_fichas = 0;
          url = `/menu_mensaje?id_cliente=${id_cliente}&id_token=${id_token}&resultado=${mgsResultado}&mensaje=${mgsResultadoMensaje}`;
          document.getElementById('modal-contenido').innerHTML = '';
          cargarContenido(url);
        } else {
          cargando_fichas = 0;
          msgUsuario.innerHTML = 'Disculpas, ha ocurrido un error. Por favor, reintentar la acción.';
        }
  } catch (error) {
      cargando_fichas = 0;
      msgUsuario.innerHTML = 'Disculpas, ha ocurrido un error. Por favor, reintentar la acción.';
  }
};

const retirarFichas = async (id_cliente, id_token, minimo_retiro) => {
  if (retirando_fichas == 1) {
      alert('Por Favor Aguardar. Se está Procesando la Solicitud.');
      return;
  }
  retirando_fichas = 1;
  let mgsResultado = '';
  let mgsResultadoMensaje = '';
  let url = '';
  const msgUsuario = document.getElementById('msgUsuario');
  const titular = document.getElementById('titular');
  const importe = document.getElementById('importe');
  const cbu = document.getElementById('cbu');
  // Expresión regular para verificar si es un número entero
  var patron_nro_entero = /^\d+$/;

  if (importe.value == '') {
    msgUsuario.innerHTML = 'Por favor, completar el Importe!';
    retirando_fichas = 0;
    return;
  }
  // Verificar si el valor coincide con el patrón
  if (!patron_nro_entero.test(importe.value)) {
    msgUsuario.innerHTML = 'Por favor, Ingresar Sin Centavos!';
    retirando_fichas = 0;
    return;
  }
  // Verificar si el valor supera el mínimo de carga
  if (importe.value < minimo_retiro) {
    msgUsuario.innerHTML = 'Por favor, Ingresar un Importe Mayor o igual al Mínimo de Retiro!';
    retirando_fichas = 0;
    return;
  }
  if (titular.value == '') {
    msgUsuario.innerHTML = 'Por favor, completar el Titular!';
    retirando_fichas = 0;
    return;
  }
  if (cbu.value == '') {
    msgUsuario.innerHTML = 'Por favor, completar el CBU!';
    retirando_fichas = 0;
    return;
  }
  try {
        const solicitud_titular = titular.value;
        const solicitud_importe = importe.value;
        const solicitud_cbu = cbu.value;
        const response = await fetch(`/retirar_fichas`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'},
          body: JSON.stringify({  id_cliente, 
                                  id_token, 
                                  solicitud_titular,
                                  solicitud_importe,
                                  solicitud_cbu })
        });
        if (response.ok) {
          const data = await response.json();
          mgsResultado = data.resultado;
          mgsResultadoMensaje = data.mensaje;
          //alert(mgsResultadoMensaje);
          retirando_fichas = 0;
          url = `/menu_mensaje?id_cliente=${id_cliente}&id_token=${id_token}&resultado=${mgsResultado}&mensaje=${mgsResultadoMensaje}`;
          document.getElementById('modal-contenido').innerHTML = '';
          cargarContenido(url);
        } else {
          retirando_fichas = 0;
          msgUsuario.innerHTML = 'Disculpas, ha ocurrido un error. Por favor, reintentar la acción.';
        }
  } catch (error) {
    retirando_fichas = 0;
      msgUsuario.innerHTML = 'Disculpas, ha ocurrido un error. Por favor, reintentar la acción.';
  }
};

function scrollToBottom() {
    const chatMessages = document.getElementById("chat-messages");
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function cargarContenidoChats(id_cliente, mensaje, alerta) {
  if ((mensaje != '' || alerta) && document.getElementById("chat-messages")) 
  {
    let mensaje_envio = mensaje;
    if (alerta) {
      mensaje_envio = '';   
    } else {
      mensaje_envio = mensaje_envio.replace('/','<<');
    }
    const url = `/menu_chat_detalle?id_cliente=${encodeURIComponent(id_cliente)}&mensaje=${encodeURIComponent(mensaje_envio)}`;
    fetch(url)
    .then(response => response.text())
    .then(data => {
        const chatMessages = document.getElementById("chat-messages");
        chatMessages.innerHTML = data;
        chatMessages.scrollTop = chatMessages.scrollHeight;
        if (!alerta) {
          const texto_mensaje = document.getElementById('message-input');
          texto_mensaje.value = '';
          texto_mensaje.focus();
          enviarMensaje('chat', id_cliente);
        };
    })
    //.then(enviarMensaje('chat', id_cliente))
    .catch(error => {
        console.error('Error:', error);
    });
  }
}