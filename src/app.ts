import express from 'express';
import session from 'express-session';
import path from 'path';
import dotenv from 'dotenv';
import { mostrarRegistro } from './controllers/authController';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración sesión
app.use(session({
  secret: process.env.SESSION_SECRET || 'secreto',
  resave: false,
  saveUninitialized: false,
}));

// Para parsear formularios
app.use(express.urlencoded({ extended: false }));

// Motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Carpeta pública
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de prueba
 app.get('/', (req, res) => {
  res.render('index', { session: req.session });
});

//Ruta de registro
app.get('/registro',mostrarRegistro);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
