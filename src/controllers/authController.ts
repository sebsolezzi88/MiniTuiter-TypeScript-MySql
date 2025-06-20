import { Request, Response } from "express";

export const mostrarRegistro = (req: Request, res: Response) => {
  return res.render("registro");
};

export const submitRegistro = (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;
    const passwordr = req.body.passwordr;

    console.log(username, password,passwordr);
    return res.send('lis');
};
