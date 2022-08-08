import { prisma } from '../app/prisma'

export async function getThemeById(id: number) {
  return await prisma.theme.findUnique({
    where: {
      id,
    },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
    },
  })
}

export async function getAllThemes() {
  return prisma.theme.findMany()
}
