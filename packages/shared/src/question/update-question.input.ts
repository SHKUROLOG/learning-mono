import { AnswerDto } from '@learning-mono/shared'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'

export class UpdateQuestionInput {
  @IsNumber()
  id: number

  @IsString()
  title: string

  @IsOptional()
  @ValidateNested()
  @Type(() => AnswerDto)
  answers?: AnswerDto[]
}
