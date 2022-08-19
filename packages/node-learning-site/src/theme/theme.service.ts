import { Theme } from '@prisma/client'
import { Deps, inject } from '../app/di'
import { CreateThemeInput, UpdateThemeInput } from '@learning-mono/shared'

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

export async function createTheme(createThemeInput: CreateThemeInput): Promise<Theme> {
  return inject(Deps.PRISMA).theme.create({
    data: {
      title: createThemeInput.title,
      categoryId: createThemeInput.categoryId,
    },
  })
}

export async function updateTheme(updateThemeInput: UpdateThemeInput): Promise<Theme> {
  return inject(Deps.PRISMA).theme.update({
    data: {
      title: updateThemeInput.title,
    },
    where: {
      id: updateThemeInput.id,
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
