import { Request, Response } from "express";
import Tuit from "../models/Tuit";
import User from "../models/User";


export const obtenerTodosLosTuits = async (req:Request,res:Response) =>{
    
    const error = req.session.error;
    req.session.error = undefined;
    try {
        const tuits = await Tuit.findAll({
        include: {
            model: User,
            as: 'usuario',
            attributes: ['username'] 
        },
        order: [['createdAt', 'DESC']] 
        });
        return res.render('index',{session: {...req.session,error},tuits});
    } catch (error) {
        req.session.error = 'Error al obtener los Tuits';
        res.send(error)
        return res.render('index',{session: {...req.session,error}});
    }
    
}

export const mostrarAbout = async (req:Request,res:Response) =>{
    return res.render('about');
}
