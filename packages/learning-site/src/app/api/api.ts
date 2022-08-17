import { answer } from '@app/api/answer'
import { auth } from '@app/api/auth'
import { category } from '@app/api/category'
import { question } from '@app/api/question'
import { theme } from '@app/api/theme'

export const api = {
  auth,
  category,
  theme,
  question,
  answer,
}
