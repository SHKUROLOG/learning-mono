import { Router } from 'express'
import { omit } from 'lodash'
import * as authService from './auth.service'

export const authRoute = Router()

authRoute.post('/login', async (req, res) => {
  const { login, password } = req.body
  const user = await authService.login(login, password)

  if (!user)
    return res.status(403).json({ error: 'Invalid login or password' })

  req.session.user = user
  res.json({ user: omit(user, ['password']) })
})

authRoute.post('/logout', async (req, res) => {
  req.session.user = undefined
  res.json({ ok: true })
})

authRoute.get('/me', async (req, res) => {
  if (req.session.user)
    res.json({ user: omit(req.session.user, ['password']) })
  else
    res.json({ user: null })
})
