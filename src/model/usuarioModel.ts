import { Usuario } from '../@types/usuario.js'
import { dbConn } from '../config/dbConnect.js'

export class UsuarioModel {
  async criar(usuario: Usuario) {
    const retorno = await dbConn('usuario').insert({
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha
    })

    return usuario
  }

  async login(usuario: Usuario) {
    const retorno = await dbConn('usuario').where({ email: usuario.email, senha: usuario.senha }).select('email', 'senha').first()
    return retorno
  }
}
