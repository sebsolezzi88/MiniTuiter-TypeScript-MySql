import { Request, Response } from "express";


//Rutas GET
export const mostrarTuitsUsuario = (req: Request, res: Response) => {
  
  req.session.error = undefined;
  req.session.success = undefined;

  //return res.render("tuits",{session:{success,error}});
  return res.render("tuits");

}