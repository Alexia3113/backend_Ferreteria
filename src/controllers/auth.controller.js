//importamos el modelo de datos
import User from '../models/user.models.js';
import Role from '../models/roles.models.js'

import bcryptjs from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import dotenv from 'dotenv';

//Configuramos la lectura de las variables de entorno
dotenv.config();
const roleadmin=process.env.SETUP_ROLE_ADMIN;
const roleuser=process.env.SETUP_ROLE_USER;

//funcion para registrar usuarios
export const register = async (req, res)=>{
    const {username, apellido,email, password} = req.body;
    //console.log(username, email, password);
    try {
        //validamos que el email no este registrado en la base de datos
        const userFound=await User.findOne({email});
        if(userFound) //si encontro un usuario que ya tenga ese email
        return res.status(400).json({message:["El email ya esta en uso"]}) //retorna un mensaje de error
        const passwordHash = await bcryptjs.hash(password,10);
        const role = await Role.findOne({role:roleuser});
        const newUser = new User({
            username,
            apellido,
            email,
            password: passwordHash,
            role: role._id
        });

        const userSaved = await newUser.save()
        const token = await createAccessToken({id: userSaved._id})
        res.cookie('token', token,{
            sameSite: 'lax', //para indicar que el back y el front estan en distintos servidores
            //secure:true //activamos esta opcion cuando hagamos el deployment, para que funcione el https
        });
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            apellido:userSaved.apellido,
            email: userSaved.email,
            role: userSaved.role,
            isAdmin:false,
            createdAt: userSaved.createdAt,
            updateAt: userSaved.updatedAt
        });
    } catch (error) {
        console.log(error);       
    }
}//fin de registro

//funcion para iniciar sesion
export const login = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const userFound = await User.findOne({email});
        if(!userFound){
            return res.status(400).json({message:[ 'Usuario no encontrado']})
        }
        //comparamos el password que envio el usuario con el de la base de datos
        const isMatch = await bcryptjs.compare(password, userFound.password);
        if(!isMatch){
            return res.status(400).json({message: ['Password no coincide']})
        }
        const token = await createAccessToken({id: userFound._id})
        res.cookie('token', token,{
            sameSite: 'lax', //para indicar que el back y el front estan en distintos servidores
            //secure:true //activamos esta opcion cuando hagamos el deployment, para que funcione el https
        });
        const roleAdmin = await Role.findOne({role: roleadmin})
        let isAdmin= false;
        if(roleAdmin.equals(userFound.role))
            isAdmin= true;
        const userResponse ={
            id: userFound._id,
            username: userFound.username,
            apellido: userFound.apellido,
            email: userFound.email,
            isAdmin:isAdmin,
            createdAt: userFound.createdAt,
            updateAt: userFound.updatedAt
        }
        res.json(userResponse);      
    } catch (error) {
        console.log(error);       
    }
}//fin de login

export const logout =(req,res) =>{
    res.cookie("token");
    return res.sendStatus(200);
}//fin de salida

export const usuarios= async (req,res)=>{
    const userFound = await User.find();

     return res.json(userFound);
}//fin de perfil de usuarios

export const deleteUsuario = async (req, res) => {
    try {
        const usuario = await User.findByIdAndDelete(req.params.id);
        if (!usuario)
            return res.status(404).json({message: ["Usuario no encontrado"]});
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send({message: ['Error eliminar el usuario']});
    }
};

//funcion para validar el token de inicio de sesión
export const verifyToken = async(req,res) =>{
    const {token} = req.cookies;

    if(!token)
        return res.status(401).json({message:["No autorizado"]});

    jwt.verify(token, TOKEN_SECRET, async (err,user)=>{
        if(err) //si hay un error al validar el token
        return res.status(401).json({message:["No autorizado"]});

        const userFound = await User.findById(user.id);
        if(!userFound) //sino encuentra el usuario que viene en el token
            return res.status(401).json({message:["No autorizado"]});

        const roleAdmin = await Role.findOne({role: roleadmin})
        let isAdmin= false;
        if(roleAdmin.equals(userFound.role))
            isAdmin=true;
        const userResponse ={
            id: userFound._id,
            username:userFound.username,
            apellido: userFound.apellido,
            email:userFound.email,
            isAdmin: isAdmin
        }

        return res.json(userResponse);
    });
}//fin de verifyToken
