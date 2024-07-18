import { Usuario } from '../@types/usuario.js';
import { dbConn } from '../config/dbConnect.js';

export class UsuarioModel {
    async criar(usuario: Usuario) {
        try {
            const retorno = await dbConn('usuario').insert({ nome: usuario.nome, email: usuario.email, senha: usuario.senha });

            return usuario;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async login(usuario: Usuario) {
        const retorno = await dbConn('usuario').where({ email: usuario.email, senha: usuario.senha }).select('email', 'senha').first();
        return retorno;
    }

    async buscarPorEmail(email: string) {
        try {
            const retorno = await dbConn('usuario').select().where('email', email).first();
            console.log(retorno);
            return retorno;
        } catch (err) {
            if (err.code == 'ECONNREFUSED') {
                throw { code: 1, message: 'Erro ao conectar com o banco de dados. Favor contatar o Administrador do sistema.' };
            }
        }
    }
}
