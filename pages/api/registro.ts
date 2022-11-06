import type {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import type {respostaPadraoMsg} from '../../types/respostaPadraoMsg';
import type {registroRequisicion} from '../../types/registroRequisicion';
import {UsuarioModel} from '../../models/UsuarioModel';
import {conectarMongoDB} from '../../middlewares/conectarMongoDB';
import md5 from 'md5';

const endpointRegistro = 
async (req: NextApiRequest, res: NextApiResponse<respostaPadraoMsg>) =>{

    if(req.method === 'POST'){
        const usuario = req.body as registroRequisicion;

        if(!usuario.nome || usuario.nome.length < 2){
            return res.status(400).json({error : 'Nombre invalido'}); 
        }

        if(!usuario.email || usuario.email.length < 5
        || !usuario.email.includes('@')
        || !usuario.email.includes('.')){
            return res.status(400).json({error : 'email invalido'}); 
        }
        
        if(!usuario.contraseña || usuario.contraseña.length < 4){
            return res.status(400).json({error : 'Contraseña invalida'}); 
        }

        // validar si ya existe un usuario con el mismo email
        const usuarioConMismoEmail = await UsuarioModel.find({email : usuario.email});
        if(usuarioConMismoEmail && usuarioConMismoEmail.length > 0){
            return res.status(400).json({error : 'El usuario ya existe'}); 
        }

        // Guardar en el banco de datos
        const usuarioASerSalvado = {
            nome : usuario.nome,
            email : usuario.email, 
            contraseña : md5(usuario.contraseña)
        }
        await UsuarioModel.create(usuarioASerSalvado);
        return res.status(200).json({msg : 'Usuario registrado exitosamente'});    
    }
    return res.status(405).json({error : 'El metodo informado no es valido'}); 
}

export default conectarMongoDB(endpointRegistro);