import type{NextApiRequest, NextApiResponse, NextApiHandler} from 'next';
import type{respostaPadraoMsg} from '../types/respostaPadraoMsg';
import jwt, {JwtPayload} from 'jsonwebtoken';

export const validarTokenJWT = (handler : NextApiHandler) =>
    (req : NextApiRequest, res : NextApiResponse<respostaPadraoMsg>) => {

        try{
            const {MI_LLAVE_JWT} = process.env;
            if(!MI_LLAVE_JWT){
                return res.status(500).json({error : 'ENV de llave JWT no informada en la ejecución del proyecto'});
                } 
        
                if(!req || !req.headers){
                    return res.status(401).json({error : 'No fue posible validar el token de acceso'});
                }
                
            if(req.method !== 'OPTIONS'){
                const authorization = req.headers['authorization'];
                if(!authorization){
                    return res.status(401).json({error : 'No fue posible validar el token de acceso'});
                }
        
            const token = authorization.substring(7);
            if(!token){
                return res.status(401).json({error : 'No fue posible validar el token de acceso'});
            }
        
            const decoded = jwt.verify(token, MI_LLAVE_JWT) as JwtPayload;
            if(!decoded){
                return res.status(401).json({error : 'No fue posible validar el token de acceso'});
            }
            
            if(!req.query){
                req.query = {};
            }
        
            req.query.userId = decoded._Id;
        }
        
        }catch(e){
            console.log(e);
            return res.status(401).json({error : 'No fue posible validar el token de acceso'});
        }

    
    return handler(req, res);
}