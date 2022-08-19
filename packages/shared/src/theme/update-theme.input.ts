import { IsNumber, IsString } from 'class-validator'

export class UpdateThemeInput {
  @IsNumber()
  id: number

  @IsString()
  title: string
}
