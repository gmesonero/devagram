import type{NextApiRequest, NextApiResponse} from 'next';
import { validarTokenJWT } from '../../middlewares/validarTokenJWT';

const usuarioEndpoint = (req : NextApiRequest, res : NextApiResponse) =>{
    
    return res.status(200).json('usuario autenticado');
 
}

export default validarTokenJWT(usuarioEndpoint)