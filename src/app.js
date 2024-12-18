import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();
//obtenemos el nombre del archivo actual de la variable de entorno meta.url
//y posteriormente el nombre de la carpeta actual de la app que en este caso es
//src
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

//importamos las rutas para usuarios
import authRoutes from './routes/auth.routes.js';
//importamos las rutas para productos
import productRoutes from './routes/product.routes.js';
//importar las rutas de las imagenes de los productos
import imagesRoutes from './routes/images.routes.js'

const app=express();
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:4000',
        'http://localhost',
        process.env.BASE_URL_BACK,
        process.env.BASE_URL_FRONTEND,
    ],
    credentials:true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use('/img/', express.static(path.join(_dirname, '/public/img/')))

//indicamos que el servidor utilice el objeto auhtRoutes
app.use('/api/', authRoutes);
app.use('/api/', productRoutes);

export default app;