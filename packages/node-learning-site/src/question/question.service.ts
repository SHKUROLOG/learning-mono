import { CreateQuestionInput, QuestionDto, UpdateQuestionInput } from '@learning-mono/shared'
import { deleteAnswersByQuestionId } from '../answer/answer.service'
import { Deps, inject } from '../app/di'

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

// export async function createQuestion(createQuestionInput: CreateQuestionInput) {
//   const prisma = inject(Deps.PRISMA)
//
//   if (questionInput.id) {
//     const question = await prisma.question.findUnique({
//       where: {
//         id: questionInput.id,
//       },
//       include: {
//         answers: true,
//       },
//     })
//
//     if (question) {
//       await prisma.question.update({
//         data: {
//           title: questionInput.title,
//         },
//         where: {
//           id: questionInput.id,
//         },
//       })
//
//       const answerIdsForDelete = findAnswerIdsForDelete(questionInput.answers, question.answers)
//
//       const deletePromise = prisma.answer.deleteMany({
//         where: {
//           id: {
//             in: answerIdsForDelete,
//           },
//         },
//       })
//
//       const createPromise = prisma.answer.createMany({
//         data: findAnswersForCreate(questionInput.answers, question.answers).map((v) => ({
//           ...v,
//           questionId: question.id,
//         })),
//       })
//
//       const answersForUpdate = findAnswersForUpdate(questionInput.answers, question.answers)
//       const updatePromises = answersForUpdate.map(
//         async answer =>
//           prisma.answer.update({
//             data: answer,
//             where: {
//               id: answer.id,
//             },
//           }),
//       )
//       await Promise.all([...updatePromises, createPromise, deletePromise])
//     }
//   }
//
//   return prisma.question.create({
//     data: {
//       title: questionInput.title,
//       themeId: questionInput.themeId,
//       answers: {
//         createMany: {
//           data: questionInput.answers,
//         },
//       },
//     },
//   })
// }

export async function createQuestion(createQuestionInput: CreateQuestionInput) {
  return inject(Deps.PRISMA).question.create({
    data: {
      title: createQuestionInput.title,
      themeId: createQuestionInput.themeId,
    },
  })
}

export async function updateQuestion(updateQuestionInput: UpdateQuestionInput) {
  return inject(Deps.PRISMA).question.update({
    data: {
      title: updateQuestionInput.title,
    },
    where: {
      id: updateQuestionInput.id,
    },
  })
}

export async function removeQuestion(questionId: number) {
  await deleteAnswersByQuestionId(questionId)

  return inject(Deps.PRISMA).question.delete({
    where: {
      id: questionId,
    },
  })
}

export async function getQuestionsByThemeId(themeId: number): Promise<QuestionDto[]> {
  return inject(Deps.PRISMA).question.findMany({
    where: {
      themeId: {
        equals: themeId,
      },
    },
    include: {
      answers: true,
    },
  })
}
