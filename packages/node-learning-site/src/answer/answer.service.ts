import { CreateAnswerInput } from '@learning-mono/shared'
import { Answer } from '@prisma/client'
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

export async function getAnswersByQuestionId(questionId: number): Promise<Answer[]> {
  return await inject(Deps.PRISMA).answer.findMany({
    where: {
      questionId: {
        equals: questionId,
      },
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

export async function createAnswer(inputAnswer: CreateAnswerInput) {
  const prisma = inject(Deps.PRISMA)
  prisma.answer.create({
    data: {
      title: inputAnswer.title,
      isCorrect: inputAnswer.isCorrect,
      questionId: inputAnswer.questionId,
    },
  })
}
