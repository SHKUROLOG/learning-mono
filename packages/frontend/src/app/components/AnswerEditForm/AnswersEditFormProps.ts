import { AnswerDto } from '@learning-mono/shared'

export interface AnswersEditFormProps {
  answer: AnswerDto
}

export interface AnswersEditFormEmits {
  (event: 'changed'): void
  (event: 'correct:toggle'): void
}
