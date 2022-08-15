import { deleteAnswersByQuestionId } from '../answer/answer.service'
import { Deps, inject } from '../app/di'
import { SaveQuestionInput } from './question.types'
import { findAnswerIdsForDelete, findAnswersForCreate, findAnswersForUpdate } from './question.utils'

export async function getQuestionById(id: number) {
  return await inject(Deps.PRISMA).question.findUnique({
    where: {
      id,
    },
    include: {
      theme: true,
    },
  })
}

export async function getAllQuestions() {
  return inject(Deps.PRISMA).question.findMany()
}

export async function saveQuestion(questionInput: SaveQuestionInput) {
  const prisma = inject(Deps.PRISMA)

  if (questionInput.id) {
    const question = await prisma.question.findUnique({
      where: {
        id: questionInput.id,
      },
      include: {
        answers: true,
      },
    })

    if (question) {
      await prisma.question.update({
        data: {
          title: questionInput.title,
        },
        where: {
          id: questionInput.id,
        },
      })

      const answerIdsForDelete = findAnswerIdsForDelete(questionInput.answers, question.answers)

      const deletePromise = prisma.answer.deleteMany({
        where: {
          id: {
            in: answerIdsForDelete,
          },
        },
      })

      const createPromise = prisma.answer.createMany({
        data: findAnswersForCreate(questionInput.answers, question.answers).map((v) => ({
          ...v,
          questionId: question.id,
        })),
      })

      const answersForUpdate = findAnswersForUpdate(questionInput.answers, question.answers)
      const updatePromises = answersForUpdate.map(
        async answer =>
          prisma.answer.update({
            data: answer,
            where: {
              id: answer.id,
            },
          }),
      )
      await Promise.all([...updatePromises, createPromise, deletePromise])
    }
  }

  return prisma.question.create({
    data: {
      title: questionInput.title,
      themeId: questionInput.themeId,
      answers: {
        createMany: {
          data: questionInput.answers,
        },
      },
    },
  })
}

export async function deleteQuestion(questionId: number) {
  await deleteAnswersByQuestionId(questionId)

  return inject(Deps.PRISMA).question.delete({
    where: {
      id: questionId,
    },
  })
}

export async function removeQuestion(questionId: number) {
  return inject(Deps.PRISMA).question.delete({
    where: {
      id: questionId,
    },
  })
}
