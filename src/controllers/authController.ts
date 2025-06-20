import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import User from "../models/User";

//Para metodo GET
export const mostrarRegistro = (req: Request, res: Response) => {
  const error = req.session.error;
  req.session.error = undefined;
  return res.render("registro",{session:{error}});
}

export const mostrarLogin = (req: Request, res: Response) => {
  const error = req.session.error;
  const success = req.session.success;
  req.session.error = undefined;
  req.session.success = undefined;
  return res.render("login",{session:{error,success}});
}

//Para metodo POST
export const submitRegistro = async (req: Request, res: Response) => {
    const username = req.body.username.trim();
    const password = req.body.password.trim();
    const passwordr = req.body.passwordr.trim();

    //Comprobacion de campos
    if(username ==='' || password ==='' || passwordr ===''){
      req.session.error = 'Debe completar todos los campos';
      return res.redirect('/registro');
    }
    if(password !== passwordr){
      req.session.error = 'Los password no coinciden';
      return res.redirect('/registro');
    }
    //Comprobar si ya existe es nombre de usuario
    const existeUsuario = await User.findOne({where:{username:username}});
    if(existeUsuario){
      req.session.error = 'Nombre de usuario ya en uso';
      return res.redirect('/registro');
    }
    try {
      // Hashear la contraseña y crear usuario
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({username:username,password:hashedPassword});
      req.session.success = "Registrado! Puedes iniciar sesión!";
      return res.redirect('/login');

    } catch (error) {
      req.session.error = 'Error al crear cuenta';
      return res.redirect('/registro');
    }
    
};

export const submitLogin = async (req:Request, res:Response) =>{
  const username = req.body.username.trim();
  const password = req.body.password.trim();

  if(username === ''  || password === ''){
    req.session.error = "Debe completar ambos campos";
    return res.redirect('/login');
  }
  try {
    //comprobar si el usuario existe y si el password es correcto
    const existeUsuario = await User.findOne({where:{username}})
    if(!existeUsuario){
      req.session.error = "Usuario no registrado";
      return res.redirect('/login');
    }
    const passwordValido = await bcrypt.compare(password, existeUsuario.password);

    if (!passwordValido) {
      req.session.error = "Password incorrecto";
      return res.redirect('/login');
    }
    //Todo correcto
    req.session.userId = existeUsuario.id;
    req.session.userName = existeUsuario.username;
    return res.redirect('/tuits');

  } catch (error) {
    req.session.error = "Error al intentar login";
    return res.redirect('/login');
  }
}
