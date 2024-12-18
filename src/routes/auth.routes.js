import {Router} from 'express';
import { login,register, logout, usuarios, verifyToken, deleteUsuario } from '../controllers/auth.controller.js';

//importamos el validatorSchema
import { validateSchema } from '../middlewares/validator.middleware.js';
//importamos los esquemas de validacion
import { registerSchema, loginSchema } from '../schemas/auth.schemas.js';

const router = Router();

router.get('/verify', verifyToken);

router.post('/register',validateSchema(registerSchema),register);

router.post('/login',validateSchema(loginSchema),login);

router.post('/logout',logout);

router.get('/usuarios',usuarios);

router.delete('/delete/:id',deleteUsuario);


export default router;