import { IsNumber, IsString } from 'class-validator'

export interface AnswerTypesInput {
  title: string
  answerId?: number
  questionId?: number
}

export class AnswerInput {
  @IsString()
  title: string

  @IsNumber()
  themeId: number
}
