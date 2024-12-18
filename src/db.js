import mongoose from 'mongoose';

export const connectDB = async ()=>{
    try {
        const url = process.env.MONGODB_URLFERRE
        //await mongoose.connect('mongodb://127.0.0.1/sistemaFerre');
        await mongoose.connect(url).then( ()=>{
            console.log("Base de datos conectada");
        })
        .catch( (err)=>{
            console.log(err);
        })
        console.log("Base de datos conectada");
    } catch (error) {
        console.log(error);       
    }
}