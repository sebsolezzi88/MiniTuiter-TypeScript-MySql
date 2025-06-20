import { Request, Response } from "express";

export const mostrarRegistro = (req: Request, res: Response) => {
    return res.render('registro');
};
