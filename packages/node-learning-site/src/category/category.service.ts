import { Category } from '@prisma/client'
import { deleteAnswersByQuestionId, removeAnswer } from '../answer/answer.service'
import { Deps, inject } from '../app/di'
import { deleteQuestion, removeQuestion } from '../question/question.service'
import { removeTheme, removeThemes } from '../theme/theme.service'

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
  await destroyCategory(categoryId)

  return inject(Deps.PRISMA).category.delete({
    where: {
      id: categoryId,
    },
  })
}

export async function destroyCategory(removeCategoryId: number) {
  const prisma = inject(Deps.PRISMA)
  const themeIds = await prisma.theme.findMany({
    where: {
      categoryId: {
        equals: removeCategoryId,
      },
    },
  })

  const questionIds = await prisma.question.findMany({
    where: {
      themeId: {
        in: themeIds.map(v => v.id),
      },
    },
  })

  await prisma.answer.deleteMany({
    where: {
      questionId: {
        in: questionIds.map(v => v.id),
      },
    },
  })

  await Promise.all(questionIds.map(v => removeQuestion(v.id)))
  await Promise.all(themeIds.map(v => removeTheme(v.id)))
}
