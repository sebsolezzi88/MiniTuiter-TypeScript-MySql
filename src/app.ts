import express from 'express';
import session from 'express-session';
import path from 'path';
import dotenv from 'dotenv';

import { mostrarLogin, mostrarRegistro,submitLogin,submitRegistro } from './controllers/authController';
import {eliminarTuit, mostrarTuitsUsuario,submitEditarTuit,submitTuit, verEditarTuit} from './controllers/tuitsControllers';
import { protegerRuta } from './middlewares/middelwares';
import { obtenerTodosLosTuits } from './controllers/mainController';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Para parsear formularios
app.use(express.urlencoded({ extended: false }));


// Configuración sesión
app.use(session({
  secret: process.env.SESSION_SECRET || 'secreto',
  resave: false,
  saveUninitialized: false,
}));

//Midelware para variables session global
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Carpeta pública
app.use(express.static(path.join(__dirname, 'public')));


// Ruta de index
 app.get('/', obtenerTodosLosTuits);


//Ruta de registro
app.get('/registro',mostrarRegistro);
app.post('/registro',submitRegistro);

//Ruta de login
app.get('/login',mostrarLogin);
app.post('/login',submitLogin);

//Ruta tuits
app.get('/tuits',protegerRuta,mostrarTuitsUsuario);
app.post('/tuits',protegerRuta,submitTuit);
app.post('/tuits/eliminar/:id',protegerRuta,eliminarTuit);
app.get('/tuits/editar/:id',protegerRuta,verEditarTuit);
app.post('/tuits/editar/:id',protegerRuta,submitEditarTuit);


//TODO: Crear un controller para listar los tuits por fecha en la pagina principal

//ruta logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
