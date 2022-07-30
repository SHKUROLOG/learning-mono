import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import express from 'express'

const prisma = new PrismaClient()

async function main() {
  await prisma.$connect()

  await prisma.category.create({
    data: {
      title: 'who you',
      themes: {
        create: {
          title: 'asd',
          questions: {
            create: {
              title: 'syka',
              answers: {
                createMany: {
                  data: [
                    { title: 'blat' },
                    { title: 'blat?' },
                    { title: 'blat??', isCorrect: true },
                    { title: 'blat???' },
                  ],
                },
              },
            },
          },
        },
      },
    },
  })

  const questions = await prisma.question.findMany({
    include: {
      answers: true,
    },
  })
  const app = express()
  const port = 3030
  app.use(cors())

  app.get('/', (req, res) => {
    res.json(questions)
  })

  app.get('/question/:id?', async (req, res) => {
    if (req.params.id) {
      const question = await prisma.question.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      })
      res.json(question)
    } else {
      const questions = await prisma.question.findMany()
      res.json(questions)
    }
  })

  app.get('/themes/:id?', async (req, res) => {
    if (req.params.id) {
      const theme = await prisma.theme.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      })
      res.json(theme)
    } else {
      const themes = await prisma.theme.findMany()
      res.json(themes)
    }
  })

  app.get('/categories/:id?', async (req, res) => {
    if (req.params.id) {
      const category = await prisma.category.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      })
      res.json(category)
    } else {
      const categories = await prisma.category.findMany()
      res.json(categories)
    }
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

main()
