const db = require('./config/db');
const UsuarioDAO = require('./dataAccess/UsuarioDAO');

async function main(){
    try{
        await db.conectar().then(()=>{
            console.log('Conectado a la base de datos');
        }).catch((error)=>{
            console.error(error);
        });
    }catch(error){
        console.error(error);
    }
    usuario1 = await UsuarioDAO.crearUsuario({
        nombre: 'Usuario1',
        correo: 'pablo@gmail.com',
        contrasena: 'luispablo11',
        avatar: 'avatar1'
    })
}

main()
