import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { createImage, getImageById, updateImage, deleteImage } from '../controllers/images.controller.js';

//importamos el middleware para la carga de imagenes
import { uploadImage } from '../middlewares/uploadImage.middleware.js';

const router = Router();

//ruta para crear una imagen 
router.post('/images', authRequired,uploadImage,createImage);

//ruta para obtener una imagen por Id
router.get('/images/:id', authRequired,getImageById);

//ruta para eliminar una imagen
router.delete('/images/:id',authRequired,deleteImage);

//ruta para actualizar una imagen
router.put('/images/:id', authRequired,uploadImage,uploadImage);

export default router;