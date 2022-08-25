import { Category } from '@prisma/client'
import { getAnswersByQuestionId, removeAnswer } from '../answer/answer.service'
import { Deps, inject } from '../app/di'
import { getQuestionsByThemeId, removeQuestion } from '../question/question.service'
import { getThemesByCategoryId, removeTheme } from '../theme/theme.service'
import { CreateCategoryInput, UpdateCategoryInput } from '@learning-mono/shared'

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

export async function getAllCategories(): Promise<Category[]> {
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

export async function updateCategory(updateCategoryInput :UpdateCategoryInput): Promise<Category> {
  return inject(Deps.PRISMA).category.update({
    data: {
      title: updateCategoryInput.title,
      image: updateCategoryInput.image,
    },
    where: {
      id: updateCategoryInput.id,
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

export async function destroyCategory(categoryId: number | number[]): Promise<void> {
  const themes = await getThemesByCategoryId(categoryId)
  const themesIds = themes.map(v => v.id)

  const questions = await getQuestionsByThemeId(themesIds)
  const questionsIds = questions.map(v => v.id)

  const answers = await getAnswersByQuestionId(questionsIds)
  const answerIds = answers.map(v => v.id)

  await removeAnswer(answerIds)
  await removeQuestion(questionsIds)
  await removeTheme(themesIds)
}

// async function getThemeIds(removeCategoryId: number): Promise<number[]> {
//   const themes = await getThemesByCategoryId(removeCategoryId)
//
//   return themes.map(v => v.id)
// }
//
// async function getQuestionIds(themeIds: number): Promise<number[]> {
//   const themes = await getQuestionsByThemeId(themeIds)
//
//   return themes.map(v => v.id)
// }
//
// async function getAnswerIds(questionIds: number): Promise<number[]> {
//   const themes = await getAnswersByQuestionId(questionIds)
//
//   return themes.map(v => v.id)
// }
