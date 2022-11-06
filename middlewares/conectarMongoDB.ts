import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import mongoose from 'mongoose';
import type {respostaPadraoMsg} from '../types/respostaPadraoMsg';

export const conectarMongoDB = (handler : NextApiHandler) =>
    async (req: NextApiRequest, res: NextApiResponse<respostaPadraoMsg>) =>{

        // verificar si el banco de datos ya está conectado, 
        // si lo está seguir para endPoint o proximo middleware

        if(mongoose.connections[0].readyState){
        return handler(req, res);
    }

        //ya que no està conectado vamos a conectarlo
        // obtener la variable de ambiente env
        const {DB_CONEXAO_STRING} = process.env;

        //si la env está vacia aborta el uso y avisa al programador
        if(!DB_CONEXAO_STRING){
            return res.status(500).json({error : 'env de configuración del banco no informada'});
        }

        mongoose.connection.on('connected', () => console.log('Banco de datos conectado'));
        mongoose.connection.on('error', error => console.log(`Ocurrió un error al conectar el Banco de datos: ${error}`));
        await mongoose.connect(DB_CONEXAO_STRING);
        
        //ahora puedo seguir para mi endpoint, poqrue estoy conectado 

        return handler(req, res);
    }

    