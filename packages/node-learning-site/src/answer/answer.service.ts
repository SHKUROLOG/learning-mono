import { Deps, inject } from '../app/di'
import { AnswerTypesInput } from './answer.types'

export async function removeAnswer(answerId: number) {
  const prisma = inject(Deps.PRISMA)

  return prisma.answer.delete({
    where: {
      id: answerId,
    },
  })
}

export async function deleteAnswersByQuestionId(questionId: number) {
  return inject(Deps.PRISMA).answer.deleteMany({
    where: {
      questionId,
    },
  })
}

export async function updateAnswer(inputAnswer: AnswerTypesInput) {
  const prisma = inject(Deps.PRISMA)
  prisma.answer.update({
    data: {
      title: inputAnswer.title,
    },

    where: {
      id: inputAnswer.answerId,
    },
  })
}

export async function createAnswer(inputAnswer: AnswerTypesInput) {
  const prisma = inject(Deps.PRISMA)
  if (inputAnswer.questionId) {
    prisma.answer.create({
      data: {
        title: inputAnswer.title,
        questionId: inputAnswer.questionId,
      },
    })
  }
}
