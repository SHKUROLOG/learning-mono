import { Question } from '@learning-mono/shared'
import { SaveAnswerInput } from './answer'
import { instance } from './axios'

export interface ConfigQuestionDeleteInput {
  data: {
    id: number
  }
}

export interface SaveQuestionInput {
  title: string
  themeId: number
  answers: SaveAnswerInput[]
  id?: number
}

export const question = {
  async create(addForm: SaveQuestionInput): Promise<Question> {
    return await instance.post('/question', addForm)
      .then(v => v.data)
  },

  async remove(questionId: number) {
    const dataToSend: ConfigQuestionDeleteInput = {
      data: {
        id: questionId,
      },
    }

    await instance.delete('/question', {
      data: dataToSend,
    })
  },
}
