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

app.get('/menu', async (req, res) => {
    try {
        // Obtener los parámetros de la URL
        const id_cliente = parseInt(req.query.id_cliente, 10);
        const id_token = req.query.id_token;
        const menu_render = 'menu_' + req.query.menu;
        let titulo_menu = '';

        if (req.query.menu == 'cargar_fichas') 
        {   
            titulo_menu = 'Cargar Fichas';
        } else if (req.query.menu == 'retirar_fichas') 
        {   
            titulo_menu = 'Retirar Fichas';
        } else if (req.query.menu == 'panel') 
        {   
            titulo_menu = 'Panel de Solicitudes';
        } else if (req.query.menu == 'chat') 
        {    
            titulo_menu = 'Chatear con tu Agente';
        } else if (req.query.menu == 'cambiar_contraseña') 
        {   
            titulo_menu = 'Cambiar Contraseña';
        } else if (req.query.menu == 'desbloquear_usuario') 
        {   
            titulo_menu = 'Desbloquear Usuario';
        }

        const query = `select * from Obtener_Cliente_Token(${id_cliente},'${id_token}')`;
        const result = await db.handlerSQL(query);

        //console.log(`Cliente encontrado: ${result.rows.length}`);
        if (result.rows.length == 0) {
            res.render(menu_render, { message: 'Error de Sesión' });
            return;
        }
        const datos = result.rows[0];
        
        res.render(menu_render, { message: 'ok', 
                                    title: titulo_menu, 
                                    id_token : id_token, 
                                    datos : datos});
    } catch (error) {
        res.render(menu_render, { message: 'Error de Sesión'});
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