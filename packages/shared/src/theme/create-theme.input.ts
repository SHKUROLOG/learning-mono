import { IsNumber, IsString } from 'class-validator'

export class CreateThemeInput {
  @IsString()
  title: string

  @IsNumber()
  categoryId: number
}
