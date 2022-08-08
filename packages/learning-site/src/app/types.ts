export interface Category {
  id: number
  title: string
  themes: Theme[]
  image: string
}

export interface Theme {
  id: number
  title: string
  questions: Question[]
}

export interface Question {
  id: number
  title: string
  answers: Answer[]
}

export interface Answer {
  id: number
  title: string
  isCorrect: boolean
  isSelected?: boolean
}
