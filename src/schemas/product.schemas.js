import {z} from 'zod';

export const productSchema = z.object({
    name: z.string({
        required_error:'Nombre del producto requerido'
    }),
    descripcion: z.string({
      required_error:'Descripcion del producto requerido'  
    }),
    price: z.string({
        required_error:'Precio debe der un numero'
    }).optional(),
    cantidad:z.string({
        required_error:'Año debe ser un numero'
    }).optional()
}); //fin de productSchema