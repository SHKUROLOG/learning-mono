import { User } from '@prisma/client'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import { prisma } from './app/prisma'
import { authRoute } from './auth/auth.route'
import { categoryRoute } from './category/category.route'
import { getAllCategories, getCategoryById } from './category/category.service'
import { themeRoute } from './theme/theme.route'

declare module 'express-session' {
  interface SessionData {
    user: User
  }
}

async function main() {
  await prisma.$connect()

  const app = express()
  const port = 3030

  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
  app.use(express.json())
  app.use(session({
    secret: 'vdgyhas4123jfvdghjaw2311v',
    resave: false,
    saveUninitialized: false,
  }))

  app.use(authRoute)
  app.use(categoryRoute)
  app.use(themeRoute)

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

main()
