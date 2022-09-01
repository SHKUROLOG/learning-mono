import { IsNumber, IsString } from 'class-validator'

export class UpdateCategoryInput {
  @IsNumber()
  id: number

  @IsString()
  title: string

  @IsString()
  image: string
}
