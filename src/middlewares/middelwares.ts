import { Request, Response,NextFunction } from "express";

const protegerRuta = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) return res.redirect('/login');
  next();
};