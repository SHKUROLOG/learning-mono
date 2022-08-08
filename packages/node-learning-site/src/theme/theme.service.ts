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
