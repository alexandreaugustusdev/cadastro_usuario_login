import { Request, Response } from 'express'
import { Usuario } from '../@types/usuario.js'
import { UsuarioModel } from '../model/usuarioModel.js'

export class UsuarioController {
  private usuarioModel: UsuarioModel

  constructor() {
    this.usuarioModel = new UsuarioModel()
  }

  async criar(req: Request, res: Response) {
    const { nome, email, senha } = req.body as unknown as Usuario

    const usuario: Usuario = await this.usuarioModel.criar({
      nome,
      email,
      senha
    })

    return res.status(201).json(usuario)
  }

  async login(req: Request, res: Response) {
    const { nome, email, senha } = req.body as unknown as Usuario

    const usuario: Usuario = await this.usuarioModel.criar({
      nome,
      email,
      senha
    })

    return res.status(200).json(usuario)
  }
}
