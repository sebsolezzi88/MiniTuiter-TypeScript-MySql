import { Request, Response } from "express";

export const mostrarRegistro = (req: Request, res: Response) => {
  return res.render("registro");
};


export const submitRegistro = (req: Request, res: Response) => {
    const username = req.body.username.trim();
    const password = req.body.password.trim();
    const passwordr = req.body.passwordr.trim();

    if(username ==='' || password ==='' || passwordr ===''){
      req.session.error = 'Debe completar todos los campos';
      res.redirect('/registro');
    }
    return res.send('listo');
};
