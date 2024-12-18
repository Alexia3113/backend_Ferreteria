import Images from "../models/images.models.js";
import { unlink } from "fs";
import path from 'path';

//funcion para crear una imagen
export const createImage = async (req,res)=>{
    try {
        const newImage =new Images({
            url:req.file.filename,
        });
        const savedImage = await newImage.save();
        res.json(savedImage);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:['Error al crear una imagen']})
        
    }
}//fin de createImage

//funcion para obtener una imagen po Id
export const getImageById = async (req,res)=>{
    try {
        const image = await Images.findById(req.params.id);
        if(!image)
            return res.status(404).json({message:['Imagen no encontrada']});
        res.json(image)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:['Error al obtener una imagen por id']})        
    }
}//fin de getImageById

//funcion para eliminar una imagen por id
export const deleteImage = async (req,res)=>{
    try {
        const image = await Images.findByIdAndDelete(req.params.id);
        if(!image)
            return res.status.json({message:['Imagen no encontrada']})
        //despues de eliminar la imagen de la db, se necesita el archivo fisico
        const ruta=paath.resolve('./src/public/img')+"/" + image.url;
        //unlink elimina el archivo fisico de la imagen
        await unlink(ruta,(err)=>{
            if(err)
                return res.status(404).json({message:['Error al eliinar la imagen']})
            return res.json(image);
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:['Error al eliminar una imagen']})        
    }
}//fin de deleteImage

//funcion para actualizar la imagen 
export const updateImage =async(req,res)=>{
    try {
        const imageOiriginal = await Images.findById(rreq.params.id);
        if(!imageOiriginal)
            return res.status(404).json({message:['Imagen no encontrada']})
        console.log(imageOiriginal);
        //despues de traer la imagen de la db, senecesita eliminar el archivo fisico de la imagen anterior
        const ruta = path.resolve('./src/public/img')+"/" + imageOiriginal.url;
        await unlink (ruta,(err)=>{
            if(err)
                return res.status(404).json({message:['Error al eliminar la imagen']})
        });
        //se actualiza la url de la imagen a actualizar y se guarda en la base de datos
        imageOriginal.url = req.file.filename;
        const imageUpdated= await Images.findByIdAndUpdate(req.params.id, imageOriginal);
        res.json(imageUpdated);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: ['Error al eliminar una imagen']})     
    }
}//fin de updateProduct