import { Theme } from '@prisma/client'
import { Deps, inject } from '../app/di'
import { CreateThemeInput, UpdateThemeInput } from '@learning-mono/shared'
import { getQuestionsByThemeId, removeQuestion } from '../question/question.service'
import { getAnswersByQuestionId, removeAnswer } from '../answer/answer.service'

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

export async function removeTheme(themeId: number | number[]) {
  await destroyTheme(themeId)

  return inject(Deps.PRISMA).theme.deleteMany({
    where: {
      id: {
        in: themeId,
      },
    },
  })
}

export async function destroyTheme(themeId: number | number[]): Promise<void> {
  const questions = await getQuestionsByThemeId(themeId)
  const questionsIds = questions.map(v => v.id)

  const answers = await getAnswersByQuestionId(questionsIds)
  const answerIds = answers.map(v => v.id)

  await removeAnswer(answerIds)
  await removeQuestion(questionsIds)
}

// export async function removeThemesByCategoryId(categoryId: number) {
//   // destroyTheme(categoryId)
//
//   return inject(Deps.PRISMA).theme.deleteMany({
//     where: {
//       categoryId: {
//         equals: categoryId,
//       },
//     },
//   })
// }

export async function getThemesByCategoryId(categoryId: number | number[]): Promise<Theme[]> {
  return inject(Deps.PRISMA).theme.findMany({
    where: {
      categoryId: {
        in: categoryId,
      },
    },
  })
}
