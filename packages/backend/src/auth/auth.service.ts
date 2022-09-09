import { User } from '@prisma/client'
import { compare } from 'bcryptjs'
import { Deps, inject } from '../app/di'

export async function login(login: string, password: string): Promise<User | null> {
  const user = await inject(Deps.PRISMA).user.findUnique({
    where: {
      login,
    },
  })

  if (!user || !await compare(password, user.password))
    return null

  return user
}
