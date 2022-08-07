import { PrismaClient, User } from '@prisma/client'
import { compare } from 'bcryptjs'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import { omit } from 'lodash'

declare module 'express-session' {
  interface SessionData {
    user: User
  }
}

const prisma = new PrismaClient()

async function main() {
  await prisma.$connect()

  const questions = await prisma
    .question
    .findMany({
      include: {
        answers: true,
      },
    })
  const app = express()
  const port = 3030
  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
  app.use(express.json())
  app.use(session({
    secret: 'vdgyhas4123jfvdghjaw2311v',
    resave: false,
  }))

  app.get('/', (req, res) => {
    res.json(questions)
  })

  app.get('/themes/:id?', async (req, res) => {
    if (req.params.id) {
      const theme = await prisma.theme.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
        include: {
          questions: {
            include: {
              answers: true,
            },
          },
        },
      })
      res.json(theme)
    } else {
      const themes = await prisma.theme.findMany()
      res.json(themes)
    }
  })

  app.post('/login', async (req, res) => {
    const { login, password } = req.body
    const user = await prisma.user.findUnique({
      where: {
        login,
      },
    })
    if (!user || !await compare(password, user.password))
      return res.status(403).json({ error: 'Invalid login or password' })

    req.session.user = user

    res.json({ user: omit(user, ['password']) })
  })

  app.post('/logout', async (req, res) => {
    req.session.user = undefined
    res.json({ ok: true })
  })

  app.get('/me', async (req, res) => {
    if (req.session.user)
      res.json({ user: omit(req.session.user, ['password']) })
    else
      res.json({ user: null })
  })

  app.get('/categories/:id?', async (req, res) => {
    if (req.params.id) {
      const category = await prisma.category.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
        include: {
          themes: true,
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
