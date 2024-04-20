const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const db = require(__dirname + '/db');
const ejs = require('ejs');
const axios = require('axios');
///////////////////////////////////////////////////////////////////////////////
const app = express();
const PORT = process.env.PORT || 3000;
///////////////////////////////////////////////////////////////////////////////
db.pruebaConexion();
//dbMongo.pruebaConexion();
app.listen(PORT, () => {
    db.insertLogMessage(`Servidor en funcionamiento en el puerto ${PORT}`);
});
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Para analizar JSON
app.use(express.urlencoded({ extended: true })); // Para analizar datos de formularios URL-encoded
const ejecucion_servidor = false;
const ejecucion_servidor_numero = 1;
// Configurar EJS como motor de vistas/////////////////////////////////////////
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../public/views'));
//Whatsapp/////////////////////////////////////////////////////////////////////
const dias_historial = 20;
// Configuración de sesiones
app.use(session({
    secret: 'tu-secreto-seguro',
    resave: false,
    saveUninitialized: true
}));

// Rutas
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.get('/principal', async (req, res) => {
    try {
        // Obtener los parámetros de la URL
        const id_cliente = parseInt(req.query.id_cliente, 10);
        const id_token = req.query.id_token;

        const query = `select * from Obtener_Cliente_Token(${id_cliente},'${id_token}')`;
        const result = await db.handlerSQL(query);
        if (result.rows.length === 0) {
            res.render('principal', { message: 'Token o cliente incorrecto.', title: 'Gestión del Cliente'});
            return;
        }
        const datos = result.rows[0];
        
        res.render('principal', {   message: 'ok', 
                                    title: 'Gestión de Cliente', 
                                    id_token : id_token, 
                                    datos : datos});
    }
    catch (error) {
        res.render('principal', { message: 'error', title: 'Gestión de Cliente'});
    }
});

app.get('/agentes_ayuda', async (req, res) => {
    res.render('agentes_ayuda', { title: 'Tutorial de Agentes' });
});

// Páginas Generales
app.post('/login', async (req, res) => {
    try {    
        const { username, password, ipAddress } = req.body;
        const url = `https://panelesbot.com/api/loginweb`;
        // Datos que deseas enviar en la petición POST
        const data = {
            agent : {
                username : 'takitaki',
                password : 'Juanambar18.'
            },
            user : {
                username : username,
                password : password,
                plataforma : 3,
                ipAddress : ipAddress
            }
        };
        // Configuración de la petición
        const config = {
            method: 'post',
            url: url,
            data: data
          };
        // Realizar la petición POST
        const response = await axios(config);
        
        if (response.data.data.error == false) {
            const id_token = generarToken(30);
            const agente = response.data.data.data.agent;
            const monto = response.data.data.data.user.balance.amount;
            const moneda = response.data.data.data.user.balance.currency;
            const consulta2 = `select id_cliente from Confirmar_Sesion_Cliente('${agente}', '${username}', '${password}', '${id_token}', '${ipAddress}', ${monto}, '${moneda}')`;
            const result = await db.handlerSQL(consulta2);
            const id_cliente = result.rows[0].id_cliente;
            res.status(201).json({ message: 'ok', id_token : id_token, id_cliente : id_cliente});
        } else {
            res.status(401).json({ message: 'Usuario y/o Contrasñea Incorrectos' });
            return;
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión.' });
    }
});

app.post('/login_token', async (req, res) => {
    try {    
            const { id_cliente, id_token } = req.body;
            const query = `select * from Obtener_Cliente_Token(${id_cliente},'${id_token}')`;
            const result = await db.handlerSQL(query);
            if (result.rows.length === 0) {
                res.status(401).json({ message: 'Token o cliente incorrecto.' });
                return;
            }
            const monto = result.rows[0].monto;
            const moneda = result.rows[0].moneda;
            const usuario = result.rows[0].cliente_usuario;
            res.status(201).json({ message: 'ok', monto : monto, moneda : moneda, usuario : usuario});
        }
    catch (error) {
        res.status(500).json({ message: 'token invalido' });
    }
});

app.post('/logout', async (req, res) => {
    // Obtener los parámetros de la URL
    const { id_cliente, id_token } = req.body;
    //console.log(`Finalización de sesión cliente ${id_cliente}: '${id_token}'`);
    const cierre = `Select Cerrar_Sesion_Cliente(${id_cliente}, '${id_token}')`;
    await db.handlerSQL(cierre);
    res.status(201).json({ message: 'ok' });
});

app.post('/retirar_fichas', async (req, res) => {
    try {
        // Obtener los parámetros de la URL
        const { id_cliente, id_token, solicitud_titular, solicitud_importe, solicitud_cbu } = req.body;
        const queryCheck = `select * from Obtener_Cliente_Token(${id_cliente},'${id_token}')`;
        const resultCheck = await db.handlerSQL(queryCheck);
        if (resultCheck.rows.length == 0) {
            res.status(201).json({ resultado: 'error', mensaje: 'Error de Sesión' });
            return;
        }
        const queryAccion = `select * from Registrar_Cliente_Accion(${id_cliente}, 2, '${solicitud_titular}', ${solicitud_importe}, 0, '${solicitud_cbu}', 0)`;
        const resultAccion = await db.handlerSQL(queryAccion);
        const cod_oper = resultAccion.rows[0].codigo_operacion;
        const mensaje = `Solicitud de Retiro Creada! Nro de Operación: ${cod_oper}`;
        res.status(201).json({ resultado: `ok`, mensaje: mensaje });
    } catch (error) {
        res.status(201).json({ resultado: 'error', mensaje: error });
    }
});

app.post('/cargar_fichas', async (req, res) => {
    try {
        // Obtener los parámetros de la URL
        const { id_cliente, id_token, solicitud_titular, solicitud_importe, id_cuenta_bancaria, bono } = req.body;
        const queryCheck = `select * from Obtener_Cliente_Token(${id_cliente},'${id_token}')`;
        const resultCheck = await db.handlerSQL(queryCheck);
        if (resultCheck.rows.length == 0) {
            res.status(201).json({ resultado: 'error', mensaje: 'Error de Sesión' });
            return;
        }
        const queryAccion = `select * from Registrar_Cliente_Accion(${id_cliente}, 1, '${solicitud_titular}', ${solicitud_importe}, ${id_cuenta_bancaria}, '', ${bono})`;
        const resultAccion = await db.handlerSQL(queryAccion);
        const cod_oper = resultAccion.rows[0].codigo_operacion;
        const mensaje = `Solicitud de Carga Creada! Nro de Operación: ${cod_oper}`;
        res.status(201).json({ resultado: `ok`, mensaje: mensaje });
    } catch (error) {
        res.status(201).json({ resultado: 'error', mensaje: error });
    }
});

app.post('/cambiar_contrasena', async (req, res) => {
    try {
        // Obtener los parámetros de la URL
        const { id_cliente, id_token, contrasena } = req.body;
        const queryCheck = `select * from Obtener_Cliente_Token(${id_cliente},'${id_token}')`;
        const resultCheck = await db.handlerSQL(queryCheck);
        if (resultCheck.rows.length == 0) {
            res.status(201).json({ resultado: 'error', mensaje: 'Error de Sesión' });
            return;
        }
        const datos = resultCheck.rows[0];

        const cambio_contraseña3 = require('./scrap_bot3/contraseña.js');
        
        let resultado = '';
        if (datos.id_plataforma == 1) {
            resultado = await cambio_contraseña3(datos.cliente_usuario, contrasena, datos.agente_usuario, datos.agente_password);
        } else {
            res.status(201).json({ resultado: 'error', mensaje: 'Error de Interacción con la Plataforma' });
        }

        if (resultado == 'ok') {
            queryAccion = `select Registrar_Cliente_Accion(${id_cliente}, 3, '', 0, 0, '', 0)`;
            resultAccion = await db.handlerSQL(queryAccion);
            res.status(201).json({ resultado: 'ok', mensaje: 'Cambio de Contraseña Exitoso!' });
        } else {
            res.status(201).json({ resultado: 'error', mensaje: 'Error al Cambiar Contraseña' });
        }
    } catch (error) {
        res.status(201).json({ resultado: 'error', mensaje: error });
    }
});

app.post('/desbloquear_usuario', async (req, res) => {
    try {
        // Obtener los parámetros de la URL
        const { id_cliente, id_token } = req.body;
        const queryCheck = `select * from Obtener_Cliente_Token(${id_cliente},'${id_token}')`;
        const resultCheck = await db.handlerSQL(queryCheck);
        if (resultCheck.rows.length == 0) {
            res.status(201).json({ resultado: 'error', mensaje: 'Error de Sesión' });
            return;
        }
        const datos = resultCheck.rows[0];

        const desbloquear3 = require('./scrap_bot3/desbloquear.js');
        
        let resultado = '';
        if (datos.id_plataforma == 1) {
            resultado = await desbloquear3(datos.cliente_usuario, datos.agente_usuario, datos.agente_password);
        } else {
            res.status(201).json({ resultado: 'error', mensaje: 'Error de Interacción con la Plataforma' });
        }

        if (resultado == 'ok') {
            queryAccion = `select Registrar_Cliente_Accion(${id_cliente}, 4, '', 0, 0, '', 0)`;
            resultAccion = await db.handlerSQL(queryAccion);
            res.status(201).json({ resultado: 'ok', mensaje: 'Desbloqueo de Usuario Exitoso!' });
        } else {
            res.status(201).json({ resultado: 'error', mensaje: 'Error al Desbloquear Usuario' });
        }
    } catch (error) {
        res.status(201).json({ resultado: 'error', mensaje: error });
    }
});

app.get('/menu_chat_detalle', async (req, res) => {
    try 
    {
        // Obtener los parámetros de la URL
        const id_cliente = parseInt(req.query.id_cliente, 10);
        const mensaje_cliente = req.query.mensaje.replace('<<','/');

        let query = `select id_cliente_chat,` +
                                `id_cliente, ` +
                                `mensaje, ` +
                                `TO_CHAR(fecha_hora_creacion, 'DD/MM/YYYY') as fecha_mensaje,` +
                                `TO_CHAR(fecha_hora_creacion, 'HH24:MI') as horario_mensaje, ` +
                                `enviado_cliente, ` +
                                `visto_cliente, ` +
                                `visto_operador, ` +
                                `id_usuario, ` +
                                `usuario, ` +
                                `TO_CHAR(fecha_hora_creacion, 'DD/MM/YYYY') = LAG(TO_CHAR(fecha_hora_creacion, 'DD/MM/YYYY')) ` +
                                `OVER (ORDER BY id_cliente_chat) AS misma_fecha `;
        
        if (mensaje_cliente == '') {        
            query = query + `from Obtener_Cliente_Chat(${id_cliente}, true);`;
        } else {        
            query = query + `from Insertar_Cliente_Chat(${id_cliente}, true, '${mensaje_cliente}', 1);`;
        }
        //console.log(query);
        const result = await db.handlerSQL(query);
        const datos = result.rows;
        //console.log(datos);
        res.render('menu_chat_detalle', { message: 'ok', datos : datos });
    }
    catch (error) {
        res.render('menu_chat_detalle', { message: 'sin mensajes' });
    }
});

app.get('/menu', async (req, res) => {
    const menu_render = 'menu_' + req.query.menu;
    try {
        // Obtener los parámetros de la URL
        const id_cliente = parseInt(req.query.id_cliente, 10);
        const id_token = req.query.id_token;
        let titulo_menu = '';

        const query = `select * from Obtener_Cliente_Token(${id_cliente},'${id_token}')`;
        const result = await db.handlerSQL(query);

        //console.log(`Cliente encontrado: ${result.rows.length}`);
        if (result.rows.length == 0) {
            res.render(menu_render, { message: 'Error de Sesión' });
            return;
        }
        const datos = result.rows[0];
        let query2 = '';
        let result2 = '';
        let datos2 = '';
        let query3 = '';
        let result3 = '';
        let datos3 = '';

        if (req.query.menu == 'cargar_fichas') 
        {   
            titulo_menu = 'Solicitud de Carga de Fichas';

            query2 = `select id_cuenta_bancaria, ` +
                        `nombre, ` +
                        `alias, ` +
                        `cbu ` +
                        `from v_Cuenta_Bancaria_Activa ` +
                        `where id_oficina = ${datos.id_oficina} ` +
                        `and marca_baja = false ` +
                        `order by monto_cargas, cantidad_cargas limit 1`;
            result2 = await db.handlerSQL(query2);
    
            //console.log(`Cliente encontrado: ${result.rows.length}`);
            if (result2.rows.length == 0) {
                res.render(menu_render, { message: 'Error de Sesión' });
                return;
            }
            datos2 = result2.rows[0];

            query3 = `select id_cliente, cantidad_cargas from v_Clientes_Cargas where id_cliente = ${id_cliente};`;
            result3 = await db.handlerSQL(query3);
            const cantidad_cargas = result3.rows[0].cantidad_cargas;

            res.render(menu_render, { message: 'ok', 
                                    title: titulo_menu, 
                                    id_token : id_token, 
                                    datos : datos,
                                    datos2 : datos2,
                                    cantidad_cargas : cantidad_cargas});
            
            return;
        } 
        else if (req.query.menu == 'retirar_fichas') 
        {   
            titulo_menu = 'Solicitud de Retiro de Fichas';

            query2 = `select id_cliente, horas_ultimo_retiro from v_Clientes_Retiros where id_cliente = ${id_cliente}`;
            result2 = await db.handlerSQL(query2);
            const horas_ultimo_retiro = result2.rows[0].horas_ultimo_retiro;

            res.render(menu_render, { message: 'ok', 
                                    title: titulo_menu, 
                                    id_token : id_token,
                                    datos : datos,
                                    horas_ultimo_retiro : horas_ultimo_retiro});
            return;
        } 
        else if (req.query.menu == 'panel') 
        {   
            titulo_menu = 'Panel de Solicitudes';
            
            query2 = `select id_cliente, ` +
                            `id_operacion, ` +
                            `codigo_operacion, ` +
                            `id_estado, ` +
                            `estado, ` +
                            `id_accion, ` +
                            `accion, ` +
                            `TO_CHAR(fecha_hora_operacion, 'YYYY/MM/DD HH24:MI:SS') as fecha_hora_operacion,` +
                            `retiro_importe, ` +
                            `retiro_cbu, ` +
                            `retiro_titular, ` +
                            `carga_importe, ` +
                            `carga_titular, ` +
                            `carga_id_cuenta_bancaria, ` +
                            `carga_bono ` +
                            `from v_Clientes_Operaciones ` +
                            `where id_cliente = ${id_cliente} ` +
                            `and id_accion in (1, 2, 5, 6) ` +
                            `order by id_operacion desc`;

            result2 = await db.handlerSQL(query2);
            datos2 = result2.rows;

            res.render(menu_render, { message: 'ok', 
                                    title: titulo_menu, 
                                    id_token : id_token,
                                    datos : datos,
                                    datos2 : datos2 });
            return;
        } 
        else if (req.query.menu == 'chat') 
        {   
            
            titulo_menu = 'Chatear con el Agente';
            
            query2 = `select id_cliente_chat,` +
                                `id_cliente, ` +
                                `mensaje, ` +
                                `TO_CHAR(fecha_hora_creacion, 'DD/MM/YYYY') as fecha_mensaje,` +
                                `TO_CHAR(fecha_hora_creacion, 'HH24:MI') as horario_mensaje, ` +
                                `enviado_cliente, ` +
                                `visto_cliente, ` +
                                `visto_operador, ` +
                                `id_usuario, ` +
                                `usuario, ` +
                                `TO_CHAR(fecha_hora_creacion, 'DD/MM/YYYY') = LAG(TO_CHAR(fecha_hora_creacion, 'DD/MM/YYYY')) ` +
                                `OVER (ORDER BY id_cliente_chat) AS misma_fecha ` +
                        `from Obtener_Cliente_Chat(${id_cliente}, true);`;

            result2 = await db.handlerSQL(query2);
            datos2 = result2.rows;

            res.render(menu_render, { message: 'ok', 
                                    title: titulo_menu, 
                                    id_token : id_token, 
                                    id_cliente : id_cliente,
                                    datos : datos,
                                    datos2 : datos2});
            return;
        } 
        else 
        {
            if (req.query.menu == 'cambiar_contraseña') 
            {   
                titulo_menu = 'Cambiar Contraseña';
            } else if (req.query.menu == 'desbloquear_usuario') 
            {   
                titulo_menu = 'Desbloquear Usuario';
            }
            res.render(menu_render, { message: 'ok', 
                                    title: titulo_menu, 
                                    id_token : id_token, 
                                    datos : datos});
            return;
        }
    } catch (error) {
        res.render(menu_render, { message: 'Error de Sesión'});
        return;
    }
});

app.get('/menu_mensaje', async (req, res) => {
    try {
        // Obtener los parámetros de la URL
        const id_cliente = parseInt(req.query.id_cliente, 10);
        const id_token = req.query.id_token;
        const resultado = req.query.resultado;
        const mensaje = req.query.mensaje;

        const queryCheck = `select * from Obtener_Cliente_Token(${id_cliente},'${id_token}')`;
        const resultCheck = await db.handlerSQL(queryCheck);

        if (resultCheck.rows.length == 0) {
            res.render('menu_mensaje', { resultado : 'error', mensaje: 'Error de Sesión' });
            return;
        }
        
        res.render('menu_mensaje', { resultado: resultado, 
                                    mensaje: mensaje, 
                                    id_token : id_token, 
                                    id_cliente : id_cliente});
    } catch (error) {
        res.render('menu_mensaje', { resultado : 'error', mensaje: 'Error de Sesión' });
    }
});

// para establecer las distintas rutas, necesitamos instanciar el express router
var router = express.Router();        

function generarToken(length) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      token += caracteres.charAt(indice);
    }
    return token;
  }