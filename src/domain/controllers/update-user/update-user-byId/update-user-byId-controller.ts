import { type Request, type Response } from 'express'
import { type UpdateUserUseCase } from '../../../../service/use-case/update-user/update-user-useCase'
import type IValidationProvider from '../../../../service/providers/IValidationProvider'

export class UpdateUserByIdController {
  constructor (
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly validationProvider: IValidationProvider
  ) {
  }

  async handle (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { email, name } = request.body
    try {
      this.validationProvider.validDataForUpdateUser({
        email,
        name
      })
      const user = await this.updateUserUseCase.execute({
        name,
        email,
        id
      })
      return response.status(200).json(user)
    } catch (error: any) {
      return response.status(400).json({
        error: {
          message: error.message ?? 'Unexpected error',
          code: '000001',
          error
        }
      })
    }
  }
}