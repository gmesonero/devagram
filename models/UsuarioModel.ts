import mongoose, {Schema} from "mongoose";

const usuarioSchema = new Schema({
    nome: {type : String, required : true},
    email: {type : String, required : true},
    contraseña: {type : String, required : true},
    avatar: {type : String, required : false},
    seguidores: {type : Number, default : 0},
    siguiendo: {type : Number, default : 0},
    publicaciones: {type : Number, default : 0},
});

export const UsuarioModel = (mongoose.models.usuarios ||
    mongoose.model('usuarios', usuarioSchema));