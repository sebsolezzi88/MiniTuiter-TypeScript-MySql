import { Request, Response } from "express";
import Tuit from "../models/Tuit";
import session from "express-session";


//Rutas GET
export const mostrarTuitsUsuario = async (req: Request, res: Response) => {
  
  const error = req.session.error;
  const success = req.session.success; 
  req.session.error = undefined;
  req.session.success = undefined;

  //obtener los tuits del usuario si los hay
  const tuits = await Tuit.findAll({where:{userId:req.session.userId}})

  //return res.render("tuits",{session:{success,error}});
  return res.render("tuits", {session: {...req.session,error,success},tuits});

}

//Rutas POST 
export const submitTuit = async (req: Request, res: Response) => {
  const tuit = req.body.tuit.trim();
  
  if(tuit===''){
    req.session.error = "Debe completar el campo";
    return res.redirect('tuits');
  }
  
  if (!req.session.userId) {
  req.session.error = "Debes estar logueado para tuitear";
  return res.redirect('/login');
}

try {
    await Tuit.create({contenido:tuit,userId:req.session.userId!})
    req.session.success = "Tuit cargado"
    return res.redirect('tuits');
  } catch (error) {
    req.session.error = "Error al cargar nuevo Tuit";
    return res.redirect('tuits');
  }
  
}

export const eliminarTuit = async (req:Request, res:Response)=>{
  const idTuit = req.params.id;
  const userId = req.session.userId;
  
  try {
    const existeTuit = await Tuit.findOne({where:{id:idTuit,userId:userId}});
    
    if(!existeTuit){
      req.session.error = "Tuit no encontrado o no autorizado";
      return res.redirect('/tuits');
    }

    await existeTuit.destroy();
    req.session.success = "Tuit Borrado";
    return res.redirect('/tuits');

  } catch (error) {
    req.session.error = "Error al borrar";
    return res.redirect('/tuits');
  }
  

}

export const verEditarTuit = async (req:Request, res:Response)=>{
  const idTuit = req.params.id;
  const userId = req.session.userId;
  const error = req.session.error;
  const success = req.session.success; 
  req.session.error = undefined;
  req.session.success = undefined;

  try {
    //obtener el tuits del usuario si los hay para editar
    const tuit = await Tuit.findOne({where:{id:idTuit,userId:userId}});
    if(!tuit){
      req.session.error = "Tuit no encontrado o no autorizado";
      return res.redirect('/tuits');
    }
    return res.render("editar", {session: {...req.session,error,success},tuit});
  } catch (error) {
      req.session.error = "Error al editar";
      return res.redirect('/tuits');
  }
  
}

export const submitEditarTuit = async (req:Request, res:Response)=>{
  const idTuit = req.params.id;
  const userId = req.session.userId;
  const error = req.session.error;
  const success = req.session.success; 
  req.session.error = undefined;
  req.session.success = undefined;

  try {
    //obtener el tuits del usuario si los hay para editar
    const tuit = await Tuit.findOne({where:{id:idTuit, userId:req.session.userId}})
    if(!tuit){
      req.session.error = "Tuit no encontrado o no autorizado";
      return res.redirect('/tuits');
    }
    return res.render("editar", {session: {...req.session,error,success},tuit});
  } catch (error) {
      req.session.error = "Error al editar";
      return res.redirect('/tuits');
  }
  
}
