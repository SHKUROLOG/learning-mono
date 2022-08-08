import { Deps, inject } from '../app/di'

export async function getCategoryById(id: number) {
  return await inject(Deps.PRISMA).category.findUnique({
    where: {
      id,
    },
    include: {
      themes: true,
    },
  })
}

export async function getAllCategories() {
  return inject(Deps.PRISMA).category.findMany()
}
