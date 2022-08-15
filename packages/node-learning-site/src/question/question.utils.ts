import { Answer } from '@prisma/client'
import { SaveAnswerInput } from './question.types'

export function findAnswersForUpdate(inputAnswers: SaveAnswerInput[], dbAnswers: Answer[]): SaveAnswerInput[] {
  const dbAnswerIds = dbAnswers.map(v => v.id)

  return inputAnswers.filter(v => dbAnswerIds.includes(v.id!))
}

export function findAnswerIdsForDelete(inputAnswers: SaveAnswerInput[], dbAnswers: Answer[]): number[] {
  const dbAnswerIds = dbAnswers.map(v => v.id)
  const inputAnswerIds = inputAnswers.map(v => v.id!)

  return dbAnswerIds.filter(v => !inputAnswerIds.includes(v))
}

export function findAnswersForCreate(inputAnswers: SaveAnswerInput[], dbAnswers: Answer[]): SaveAnswerInput[] {
  const dbAnswerIds = dbAnswers.map(v => v.id)

  return inputAnswers.filter(v => !dbAnswerIds.includes(v.id!))
}
