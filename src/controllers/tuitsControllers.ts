import { Request, Response } from "express";


//Rutas GET
export const mostrarTuitsUsuario = (req: Request, res: Response) => {
  
  const error = req.session.error;
  const success = req.session.success; 
  req.session.error = undefined;
  req.session.success = undefined;

  //return res.render("tuits",{session:{success,error}});
  return res.render("tuits", {session: {...req.session,error}
});

}

//Rutas POST 
export const submitTuit = (req: Request, res: Response) => {
  const tuit = req.body.tuit.trim();
  
  if(tuit===''){
    req.session.error = "Debe completar el campo";
    return res.redirect('tuits');
  }
  return res.send('listo');
}