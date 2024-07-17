import express, { Router } from 'express'
import { UsuarioController } from '../controller/usuarioController.js'

const usuarioRouter = express.Router()

const usuarioController: UsuarioController = new UsuarioController()

usuarioRouter.post('/usuario', usuarioController.criar)
usuarioRouter.post('/login', usuarioController.login)

export default usuarioRouter
