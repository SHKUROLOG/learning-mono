import { User } from '@prisma/client'
import { compare } from 'bcryptjs'
import { prisma } from '../app/prisma'

export async function login(login: string, password: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      login,
    },
  })

  if (!user || !await compare(password, user.password))
    return null

  return user
}
