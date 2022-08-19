import { CreateQuestionInput, QuestionDto, UpdateQuestionInput } from '@learning-mono/shared'
import { instance } from './axios'

export const question = {
  async create(createQuestionInput: CreateQuestionInput): Promise<QuestionDto> {
    return await instance.post('/question', createQuestionInput)
      .then(v => v.data)
  },

  async update(updateQuestionInput: UpdateQuestionInput): Promise<QuestionDto> {
    return await instance.put('/question', updateQuestionInput)
      .then(v => v.data)
  },

  async remove(questionId: number) {
    await instance.delete(`/question/${questionId}`)
  },
}
