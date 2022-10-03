import { CreateAnswerInput, UpdateAnswerInput } from '@learning-mono/shared'
import { Answer } from '@prisma/client'
import { Deps, inject } from '../app/di'

// export async function getAnswerById(questionId: number) {
//   return inject(Deps.PRISMA).answer.findUnique({
//     where: {
//       id: questionId,
//     },
//     include: {
//       question: true,
//     },
//   })
// }

export async function getAnswersByQuestionId(questionId: number | number[]): Promise<Answer[]> {
  return await inject(Deps.PRISMA).answer.findMany({
    where: {
      questionId: {
        in: questionId,
      },
    },
  })
}

export async function createAnswer(inputAnswer: CreateAnswerInput) {
  const prisma = inject(Deps.PRISMA)

  return prisma.answer.create({
    data: {
      title: inputAnswer.title,
      isCorrect: inputAnswer.isCorrect!,
      questionId: inputAnswer.questionId!,
    },
  })
}

export async function updateAnswer(inputAnswer: UpdateAnswerInput) {
  const prisma = inject(Deps.PRISMA)

  return prisma.answer.update({
    data: {
      title: inputAnswer.title,
    },

    where: {
      id: inputAnswer.id,
    },
  })
}

export async function removeAnswer(answerId: number | number[]) {
  const prisma = inject(Deps.PRISMA)

  return prisma.answer.deleteMany({
    where: {
      id: {
        in: answerId,
      },
    },
  })
}

export async function removeAnswersByQuestionId(questionId: number | number[]) {
  return inject(Deps.PRISMA).answer.deleteMany({
    where: {
      questionId: {
        in: questionId,
      },
    },
  })
}
