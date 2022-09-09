import { RequestHandler } from 'express'

export const authGuard: RequestHandler = (req, res, next) => {
  if (req.session.user)
    return next()

  return res.status(401).json({ error: '401: Not authorized!' })
}
