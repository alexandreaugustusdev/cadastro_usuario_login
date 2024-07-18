import Joi from 'joi';
import { Request, Response } from 'express';
import { Usuario } from '../@types/usuario.js';
import { UsuarioModel } from '../model/usuarioModel.js';

export class UsuarioController {
    async criar(req: Request, res: Response) {
        try {
            const usuarioModel = montaUsuarioModel();
            const valida = await validaEntrada(req.body);

            const { nome, email, senha } = req.body as unknown as Usuario;

            if ((await usuarioModel.buscarPorEmail(email)) != undefined && (await usuarioModel.buscarPorEmail(email)))
                throw { code: 15, message: 'Usuário já cadastrado no sistema' };

            const usuario: Usuario = await usuarioModel.criar({ nome, email, senha });

            return res.status(201).json({ status: 'OK', ...usuario });
        } catch (err) {
            if (err.code == 15) {
                return res.status(401).json({ status: 'NOK', message: err.message });
            }
            return res.status(400).json({ status: 'NOK', message: err.message });
        }
    }

    async login(req: Request, res: Response) {
        const { nome, email, senha } = req.body as unknown as Usuario;

        const usuario: Usuario = await montaUsuarioModel().login({ nome, email, senha });

        return res.status(200).json(usuario);
    }
}

async function validaEntrada(usuario: Usuario): Promise<string> {
    try {
        if (!usuario.nome.length || !usuario.email.length || !usuario.senha.length) throw new Error('Todos os campos são obrigatórios');

        const schema = Joi.object({
            nome: Joi.string().required().min(3).max(30),
            email: Joi.string().email().required(),
            senha: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        });

        const value = await schema.validateAsync(usuario);
        return 'sim';
    } catch (err) {
        throw new Error(err.message);
    }
}

function montaUsuarioModel() {
    const usuarioModel: UsuarioModel = new UsuarioModel();
    return usuarioModel;
}
