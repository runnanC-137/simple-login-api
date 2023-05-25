import { Router, type Request, type Response } from 'express'
import { authController } from '../controllers/auth-controller'
import { userController } from '../controllers/user-controller'

const router = Router()

router.post('/login', (request: Request, response: Response) => {
  authController.login(request, response)
})

router.post('/register', (request: Request, response: Response) => {
  userController.create(request, response)
})

export { router }
