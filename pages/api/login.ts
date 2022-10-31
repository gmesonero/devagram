import type {NextApiRequest, NextApiResponse} from "next";

export default (
    req : NextApiRequest, 
    res : NextApiResponse
)=> {
    if(req.method === 'POST'){
        const {login, contraseña} = req.body;

        if(login === 'admin@admin.com' &&
            contraseña === 'Admin@123') {
                res.status(200).json({msg : 'Usuario autenticado'});
            }
            return res.status(405).json({error : 'Usuario o contraseña no encontrados'});
        }
    return res.status(405).json({error : 'El metodo informado no es valido'});
}