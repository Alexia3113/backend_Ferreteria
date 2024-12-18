import Role from '../models/roles.models.js';
import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

export const initializeSetup = async ()=>{
    try {
        //configuramos la lectura de las variables de entorno
        dotenv.config();
        const roleadmin=process.env.SETUP_ROLE_ADMIN;
        const roleuser=process.env.SETUP_ROLE_USER;

        const countRoles = await Role.estimatedDocumentCount();
        //si contRoles es cero, significa que no hay roles
        if(countRoles == 0){
            console.log("Creando roles de usuarios")
            await Promise.all([
                new Role({role: roleuser}).save(),
                new Role({role: roleadmin}).save(),
            ]);
        }//fin de if

        //importamos los datos del usuario administrador 
        const setupAdminName = process.env.SETUP_ADMIN_USERNAME
        const setupAdminApellido= process.env.SETUP_ADMIN_APELLIDO
        const setupPwd = process.env.SETUP_ADMIN_PWD;
        const setupEmail = process.env.SETUP_ADMIN_EMAIL;

        //buscamos si existe un usuario admin
        const userAdmin = await User.findOne({username:setupAdminName});
        if(userAdmin == null){
            console.log('Creando usuario admin');
            const roleAdmin = await Role.findOne({role: 'admin'});
            const passwordAdmin = await bcryptjs.hash(setupPwd,10);
            const newUserAdmin = new User({
                username:setupAdminName,
                apellido: setupAdminApellido,
                email:setupEmail,
                password: passwordAdmin,
                role: roleAdmin._id
            })
            await newUserAdmin.save();
        }//fin de if
        console.log("Roles y usuarios inicializado")
    } catch (error) {
        console.log(error)      
    }
}