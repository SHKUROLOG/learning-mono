import { Category } from '@prisma/client'
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

export async function createCategory(title: string, image: string): Promise<Category> {
  return inject(Deps.PRISMA).category.create({
    data: {
      title,
      image,
    },
  })
}

export async function updateCategory(title: string, categoryId: number, image: string): Promise<Category> { // image? no required
  return inject(Deps.PRISMA).category.update({
    data: {
      title,
      image,
    },
    where: {
      id: categoryId,
    },
  })
}

export async function removeCategory(categoryId: number): Promise<Category> {
  return inject(Deps.PRISMA).category.delete({
    where: {
      id: categoryId,
    },
  })
}
