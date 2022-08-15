import { Answer } from '@prisma/client'
import { SaveAnswerInput } from './question.types'
import { findAnswerIdsForDelete, findAnswersForCreate, findAnswersForUpdate } from './question.utils'

test('adds 1 + 2 to equal 3', () => {
  expect(findAnswersForUpdate([], [])).toStrictEqual([])
})

test('', () => {
  expect(findAnswersForUpdate([{ id: 2 }] as SaveAnswerInput[], [{ id: 2 }, { id: 3 }] as Answer[])).toStrictEqual([{
    id: 2,
  }])
})

test('', () => {
  expect(findAnswersForUpdate([{ id: 2 }] as SaveAnswerInput[], [{ id: 2 }, { id: 3 }] as Answer[])).toStrictEqual([{
    id: 2,
  }])
})

test('', () => {
  expect(
    findAnswersForUpdate(
      [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }] as SaveAnswerInput[],
      [{ id: 4 }, { id: 3 }] as Answer[],
    ),
  ).toStrictEqual([{ id: 3 }, { id: 4 }])
})

test('sasd', () => {
  expect(
    findAnswerIdsForDelete(
      [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }] as SaveAnswerInput[],
      [{ id: 6 }, { id: 3 }] as Answer[],
    ),
  ).toStrictEqual([6])
})

test('asd', () => {
  expect(
    findAnswersForCreate(
      [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }] as SaveAnswerInput[],
      [{ id: 6 }, { id: 3 }] as Answer[],
    ),
  ).toStrictEqual([{ id: 1 }, { id: 2 }, { id: 4 }, { id: 5 }])
})
