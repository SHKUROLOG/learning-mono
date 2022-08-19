import { Type } from 'class-transformer'
import { IsNumber, IsString, ValidateNested } from 'class-validator'
import { AnswerDto } from '../answer'

export class Question {
  @IsNumber()
  id: number

  @IsString()
  title: string

  @ValidateNested()
  @Type(() => AnswerDto)
  answers: AnswerDto[]
}
