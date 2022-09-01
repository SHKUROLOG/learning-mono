import { ThemeDto } from '@learning-mono/shared'

export interface ThemeEditModeProps {
  theme: ThemeDto
}

export interface ThemeEditModeEmits {
  (emit: 'changed'): void
}
