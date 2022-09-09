import { PrismaClient } from '@prisma/client'
import { Deps, provide } from './di'

export async function initPrisma() {
  const prisma = new PrismaClient()

  provide(Deps.PRISMA, prisma)

  await prisma.$connect()
}
