import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

interface Identifiable {
  id: number
}

function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min
}

function getIds(items: Identifiable[]): number[] {
  return items.map(v => v.id)
}

interface TitledOptions<T> {
  count: number
  extension: T
}

function createTitledItems<T>(options: TitledOptions<T>) {
  return Array
    .from({ length: options.count })
    .map(() => ({
      title: faker.random.words(),
      ...options.extension,
    }))
}

function createThemesForCategory(categoryId: number) {
  return createTitledItems({
    count: getRandom(10, 15),
    extension: { categoryId },
  })
}

function createQuestionsForTheme(themeId: number) {
  return createTitledItems({
    count: getRandom(10, 20),
    extension: { themeId },
  })
}

function createCategoriesWithImages() {
  return createTitledItems({
    count: getRandom(3, 6),
    extension: { image: faker.image.image() },
  })
}

interface Answer {
  title: string
  questionId: number
  isCorrect?: boolean
}

function createAnswersForQuestion(questionId: number) {
  const count = getRandom(4, 6)
  const correctIndex = getRandom(0, count)

  const answers: Answer[] = createTitledItems({
    count,
    extension: { questionId },
  })

  answers[correctIndex].isCorrect = true

  return answers
}

const prisma = new PrismaClient()

async function main() {
  await prisma.$connect()

  await prisma.user.create({
    data: {
      login: 'root',
      isAdmin: true,
      password: await hash('12345678', 10),
    },
  })

  await prisma.category.createMany({
    data: createCategoriesWithImages(),
  })

  const categoryIds = await prisma.category.findMany().then(getIds)

  await prisma.theme.createMany({
    data: categoryIds.flatMap(createThemesForCategory),
  })

  const themeIds = await prisma.theme.findMany().then(getIds)

  await prisma.question.createMany({
    data: themeIds.flatMap(createQuestionsForTheme),
  })

  const questionIds = await prisma.question.findMany().then(getIds)

  await prisma.answer.createMany({
    data: questionIds.flatMap(createAnswersForQuestion),
  })
}

main()
