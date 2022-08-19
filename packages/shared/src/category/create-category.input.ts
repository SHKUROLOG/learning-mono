import { IsString } from 'class-validator'

export class CreateCategoryInput {
  @IsString()
  title: string

  @IsString()
  image: string
}
