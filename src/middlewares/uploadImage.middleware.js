import multer from 'multer';
import path from 'path';
import {v4 as uuid} from 'uuid';
import { fileURLToPath } from 'url';

//obtenemos el nombre del archivo de la variable de entorno meta.url
//y posteriormente el nombre de la carpeta de la app que en este caso es
//middleware.
//concatenamos ../ a dirname, para que suba a la carpeta src
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

//configuracion del almacenamiento de las imagenes
const storage = multer.diskStorage({
    destination: path.join(_dirname,'../public/img'), //las imagenes se guardaran en el destino src/public/img
    //filename es el nombre de la variable en la que se retornaran mediante el objeto req(request) los datos de la imagen
    //cargada en el servidor
    //Ejecuta una funcion que recibe el objeto request,un archivo y ejecuta una funcion llamada callback(cb) 
    //agregando el nombre del archivo con la extension original que ya viene cargada en el formulario
    filename: (req, file,cb,filename)=>{
                 //el nombre del archivo sera un nombre aleatorio creado por uuid+ la extension original del archivo
        cb(null, uuid()+ path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 //5mb tamaño limite de las imagenes
    }
}).single('image'); //las imagenes son recibidas mediante el atributo image y solo se podra subir una imagen con el metodo single

//al subir la imagen al servidor este middleware,dejara los datos de la imagen en el objeto request
export function uploadImage(req,res,next){
    upload(req,res, (err)=>{
        if(err){
            return res.status(500).json({message: ['Error al subir la imagen']})
        }
        next();
    })
}