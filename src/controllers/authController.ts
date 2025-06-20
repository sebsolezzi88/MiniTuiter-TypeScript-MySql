import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import User from "../models/User";
import { where } from "sequelize";


export const mostrarRegistro = (req: Request, res: Response) => {
  const error = req.session.error;
  req.session.error = undefined;
  return res.render("registro",{session:{error}});
};


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

    } catch (error) {
      req.session.error = 'Error al crear cuenta';
      return res.redirect('/registro');
    }
    return res.send('listo');
};
