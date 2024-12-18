import {z} from 'zod';

export const registerSchema = z.object({
    username: z.string({
        required_error:'Nombre de usuario requerido'
    }),
    apellido: z.string({
        required_error: "Apellido de usuario es requerido"
    }),
    email:z.string({
        required_error: 'Email es requerido'
    })
        .email({
            required_error:'Email invalido'
        }),
    password: z.string({
        required_error:'contraseña requerida'
    })
        .min(6,{
            message:'El password debe tener al menos 6 caracteres'
        }),
});// fin de registerSchema

export const loginSchema=z.object({
    email: z.string({
        required_error:'Email es requerido'
    })
        .email({
            required_error:'Email invalido'
        }),
    password: z.string({
        required_error:'contraseña requerida'
    })
        .min(6,{
            message:'El password debe tener al menos 6 caracteres'
        }),
})// fin de loginSchema