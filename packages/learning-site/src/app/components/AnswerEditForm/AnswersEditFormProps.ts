import { AnswerDto } from '@learning-mono/shared'

export interface AnswersEditFormProps {
  answer: AnswerDto
}

export interface AnswersEditFormEmits {
  (event: 'update:answer', value: AnswerDto): void
  (event: 'remove:answer', value: AnswerDto): void
}
