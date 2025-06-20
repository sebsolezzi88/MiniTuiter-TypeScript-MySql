import { Request, Response,NextFunction } from "express";

export const protegerRuta = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) return res.redirect('/login');
  next();
};