import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class AnswerDto {
  @IsNumber()
  id: number

  @IsNumber()
  questionId: number

  @IsString()
  title: string

  @IsBoolean()
  isCorrect: boolean

  @IsOptional()
  @IsBoolean()
  isSelected?: boolean
}
