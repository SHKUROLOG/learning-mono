import { IsNumber, IsString } from 'class-validator'

export class CreateQuestionInput {
  @IsString()
  title: string

  @IsNumber()
  themeId: number
}
