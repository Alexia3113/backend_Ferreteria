import mongoose from 'mongoose';

//esta funcion contendra la url de la imagen
const imagesSchema = new mongoose.Schema({
    url:{
        type:String,
        required: true
    }
});

//estas imagenes se alamcenaran en disco en el servidor y seran visibles mediante una url
export default mongoose.model('Images', imagesSchema); 