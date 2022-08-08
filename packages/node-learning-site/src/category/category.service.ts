import { prisma } from '../app/prisma'

export async function getCategoryById(id: number) {
  return await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      themes: true,
    },
  })
}

export async function getAllCategories() {
  return prisma.category.findMany()
}
