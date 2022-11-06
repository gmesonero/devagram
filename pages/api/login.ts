import type {NextApiRequest, NextApiResponse} from "next";
import { conectarMongoDB } from '../../middlewares/conectarMongoDB';
import type {respostaPadraoMsg} from '../../types/respostaPadraoMsg';
import type {loginRespuesta} from '../../types/loginRespuesta';
import {UsuarioModel} from '../../models/UsuarioModel';
import md5 from 'md5';
import jwt from 'jsonwebtoken';

const endpointLogin = async (
    req : NextApiRequest, 
    res : NextApiResponse<respostaPadraoMsg | loginRespuesta>
) => {

        const {MI_LLAVE_JWT} = process.env;
        if(!MI_LLAVE_JWT){
            res.status(500).json({error : 'ENV Jwt no informada'});
        }

    if(req.method === 'POST'){
        const {login, contraseña} = req.body;

        const usuariosEncontrados = await UsuarioModel.find({email : login, contraseña : md5(contraseña)});
        if(usuariosEncontrados && usuariosEncontrados.length > 0) {
            const usuarioEncontrado = usuariosEncontrados[0];

            const token = jwt.sign({_id : usuarioEncontrado._id}, MI_LLAVE_JWT);
            return res.status(200).json({
                    nome : usuarioEncontrado.nome, 
                    email : usuarioEncontrado.email, 
                    token});
            }
            return res.status(405).json({error : 'Usuario o contraseña no encontrados'});
        }
    return res.status(405).json({error : 'El metodo informado no es valido'});
}

export default conectarMongoDB(endpointLogin);