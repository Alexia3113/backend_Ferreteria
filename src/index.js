import app from './app.js';
import { connectDB } from './db.js';
import { initializeSetup } from './libs/initialSetup.js';

connectDB();
//creamos los roles y el usuario admin en caso que no exista
//Ejecutamos el script de inicializacion
initializeSetup();

const PORT = process.env.PORT || 4000;
app.listen(PORT);
console.log('seridor corriendo en el puerto' + PORT);
