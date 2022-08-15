import { User } from '@app/store/user'
import { Category, Question, Theme } from '@app/types'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3030',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export interface FormLogin {
  login: string
  password: string
}

export interface CategoryInput {
  title: string
  image?: string
  categoryId?: number
}

export interface ThemeInput {
  title: string
  themeId?: number
  categoryId?: number
}

export interface SaveQuestionInput {
  title: string
  themeId: number
  answers: SaveAnswerInput[]
  id?: number
}

export interface SaveAnswerInput {
  title: string
  id?: number
  isCorrect?: boolean
}

export interface ConfigQuestionDeleteInput {
  data: {
    id: number
  }
}

export interface ConfigAnswerDeleteInput {
  data: {
    id: number
  }
}

export interface AnswerInput {
  title: string
  answerId?: number
  questionId?: number
}

export const api = {
  async login(formLogin: FormLogin): Promise<User | null> {
    return await instance.post('/login', formLogin)
      .then(v => v.data.user)
  },

  async logout() {
    await instance.post('/logout')
  },

  async getMe(): Promise<User | null> {
    return await instance.get('/me')
      .then(v => v.data.user)
  },

  // CATEGORY

  async getCategories(): Promise<Category[]> {
    return await instance.get('/categories')
      .then(v => v.data)
  },

  async getCategory(categoryId: string): Promise<Category> {
    return await instance.get(`/categories/${categoryId}`)
      .then(v => v.data)
  },

  async createCategory(categoryInput: CategoryInput) {
    return await instance.post('/categories', categoryInput)
      .then(v => v.data)
  },

  async updateCategory(categoryInput: CategoryInput) {
    return await instance.put('/categories', categoryInput)
      .then(v => v.data)
  },

  async removeCategory(categoryId: number) {
    const dataToSend = {
      data: categoryId,
    }

    return await instance.delete('/answer', {
      data: dataToSend,
    })
  },

  // THEME

  async getTheme(themeId: string): Promise<Theme> {
    return await instance.get(`/themes/${themeId}`)
      .then(v => v.data)
  },

  async createTheme(themeInput: ThemeInput) {
    return await instance.post('/themes', themeInput)
      .then(v => v.data)
  },

  async updateTheme(themeInput: ThemeInput) {
    return await instance.put('/themes', themeInput)
      .then(v => v.data)
  },

  async removeTheme(themeId: number) {
    const dataToSend = {
      data: {
        id: themeId,
      },
    }

    return await instance.delete('/themes', dataToSend)
  },

  // QUESTION

  async createQuestionsAndAnswers(addForm: SaveQuestionInput): Promise<Question> {
    return await instance.post('/question', addForm)
      .then(v => v.data)
  },

  async removeQuestion(questionId: number) {
    const dataToSend: ConfigQuestionDeleteInput = {
      data: {
        id: questionId,
      },
    }

    await instance.delete('/question', {
      data: dataToSend,
    })
  },

  // ANSWER

  async createAnswer(answerInput: AnswerInput) {
    return await instance.post('/answer', answerInput)
      .then(v => v.data)
  },

  async updateAnswer(answerInput: AnswerInput) {
    return await instance.put('/answer', answerInput)
      .then(v => v.data)
  },

  async removeAnswer(answerId: number) {
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
