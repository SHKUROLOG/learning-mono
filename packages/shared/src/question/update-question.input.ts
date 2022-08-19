import { IsNumber, IsString } from 'class-validator'

export class UpdateQuestionInput {
  @IsNumber()
  id: number

  @IsString()
  title: string
}
