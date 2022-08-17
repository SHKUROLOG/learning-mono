import { Theme } from '@prisma/client'
import { Deps, inject } from '../app/di'

export async function getThemeById(id: number) {
  return await inject(Deps.PRISMA).theme.findUnique({
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
  return inject(Deps.PRISMA).theme.findMany()
}

export async function createTheme(title: string, categoryId: number): Promise<Theme> {
  return inject(Deps.PRISMA).theme.create({
    data: {
      title,
      categoryId,
    },
  })
}

export async function updateTheme(title: string, categoryId: number): Promise<Theme> {
  return inject(Deps.PRISMA).theme.update({
    data: {
      title,
    },
    where: {
      id: categoryId,
    },
  })
}

export async function removeTheme(themeId: number) {
  return inject(Deps.PRISMA).theme.delete({
    where: {
      id: themeId,
    },
  })
}

export async function removeThemes(categoryId: number) {
  return inject(Deps.PRISMA).theme.deleteMany({
    where: {
      categoryId: {
        equals: categoryId,
      },
    },
  })
}

export async function getThemesByCategoryId(categoryId: number): Promise<Theme[]> {
  return inject(Deps.PRISMA).theme.findMany({
    where: {
      categoryId: {
        in: categoryId,
      },
    },
  })
}
