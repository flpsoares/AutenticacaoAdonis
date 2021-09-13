import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import User from '../../Models/User'

export default class UsersController {
  public async index() {
    const data = User.all()

    return data
  }

  public async store({ request }: HttpContextContract) {
    const validatedData = await request.validate({
      schema: schema.create({
        email: schema.string({}, [
          rules.unique({ table: 'users', column: 'email' }),
          rules.email(),
        ]),
        password: schema.string(),
      }),
      messages: {
        'required': 'Make sure to enter the all field value',
        'email.unique': 'Email is already in use',
        'email.email': 'Invalid email',
      },
    })

    const user = User.create(validatedData)

    return user
  }
}
