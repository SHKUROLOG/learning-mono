import { Category } from '@prisma/client'
import { removeAnswer } from '../answer/answer.service'
import { Deps, inject } from '../app/di'
import { removeQuestion } from '../question/question.service'
import { getThemesByCategoryId, removeTheme } from '../theme/theme.service'
import { CreateCategoryInput } from '@learning-mono/shared'

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

export async function createCategory(categoryInput: CreateCategoryInput): Promise<Category> {
  return inject(Deps.PRISMA).category.create({
    data: {
      title: categoryInput.title,
      image: categoryInput.image,
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
    include: {
      themes: true,
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

export async function destroyCategory(removeCategoryId: number): Promise<void> {
  const themeIds = await getThemeIds(removeCategoryId)

  const questionIds = await Promise.all(themeIds.map(getQuestionIds))
  const flatQuestionIds = questionIds.flat()

  const answerIds = await Promise.all(flatQuestionIds.map(getAnswerIds))
  const flatAnswerIds = answerIds.flat()

  await Promise.all(flatAnswerIds.map(removeAnswer))
  await Promise.all(flatQuestionIds.map(removeQuestion))
  await Promise.all(themeIds.map(removeTheme))
}

async function getThemeIds(removeCategoryId: number): Promise<number[]> {
  const themes = await getThemesByCategoryId(removeCategoryId)

  return themes.map(v => v.id)
}

async function getQuestionIds(themeIds: number): Promise<number[]> {
  const themes = await getThemesByCategoryId(themeIds)

  return themes.map(v => v.id)
}

async function getAnswerIds(questionIds: number): Promise<number[]> {
  const themes = await getThemesByCategoryId(questionIds)

  return themes.map(v => v.id)
}
