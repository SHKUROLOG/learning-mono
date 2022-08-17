import { instance } from '@app/api/axios'

export interface AnswerInput {
  title: string
  answerId?: number
  questionId?: number
}

export interface ConfigAnswerDeleteInput {
  data: {
    id: number
  }
}

export interface SaveAnswerInput {
  title: string
  id?: number
  isCorrect?: boolean
}

export const answer = {
  async create(answerInput: AnswerInput) {
    return await instance.post('/answer', answerInput)
      .then(v => v.data)
  },

  async update(answerInput: AnswerInput) {
    return await instance.put('/answer', answerInput)
      .then(v => v.data)
  },

  async remove(answerId: number) {
    const dataToSend: ConfigAnswerDeleteInput = {
      data: {
        id: answerId,
      },
    }

    await instance.delete('/answer', {
      data: dataToSend,
    })
  },
}
