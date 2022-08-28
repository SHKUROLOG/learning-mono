import { plainToInstance } from 'class-transformer'
import { ClassConstructor } from 'class-transformer/types/interfaces/class-constructor.type'
import { validate } from 'class-validator'
import { Request, Response, Router } from 'express'
import { HttpError } from './HttpError'
import { InvalidIdError } from './InvalidIdError'
import {} from '@prisma/client'

type RequestWithInput<T> = Request & {
  input: T
}

type MaybePromise<T> = Promise<T> | T

type Method = 'get' | 'post' | 'put' | 'delete'

type HandlerWithInput<T, R> = (input: T, req: RequestWithInput<T>, res: Response) => MaybePromise<R>

type BaseHandler<R> = (req: Request, res: Response) => MaybePromise<R>

type HandlerWithId<R> = (id: number, req: Request, res: Response) => MaybePromise<R>

// const themeRoute = defineRoute('theme')

export function defineRoute(name: string) {
  const router = Router()

  function useHandlerWithId<R>(
    method: Method,
    path: string,
    handler: HandlerWithId<R>,
  ) {
    useHandler(method, path, async (req, res) => {
      const id = parseInt(req.params.id)
      if (Number.isNaN(id))
        throw new InvalidIdError(req.params.id)

      return handler(id, req, res)
    })
  }

  function useHandlerWithInput<T extends object, R>(
    method: Method,
    path: string,
    inputClass: ClassConstructor<T>,
    handler: HandlerWithInput<T, R>,
  ) {
    useHandler(method, path, async (req, res) => {
      const input = plainToInstance(inputClass, req.body)
      const errors = await validate(input)
      if (errors.length) {
        res.status(400).json({ errors })

        return
      }

      const reqWithInput = req as RequestWithInput<T>
      reqWithInput.input = input

      return handler(input, reqWithInput, res)
    })
  }

  function useHandler<R>(
    method: Method,
    path: string,
    handler: BaseHandler<R>,
  ) {
    router[method](path, async (req, res) => {
      try {
        const result = await handler(req, res)
        res.json(result)
      } catch (error) {
        if (error instanceof HttpError)
          res.status(error.code).json({ error })
        else
          res.status(500).json({ error })
      }
    })
  }

  const create = <T extends object, R>(
    inputClass: ClassConstructor<T>,
    handler: HandlerWithInput<T, R>,
  ) => useHandlerWithInput('post', `/${name}`, inputClass, handler)

  const update = <T extends object, R>(
    inputClass: ClassConstructor<T>,
    handler: HandlerWithInput<T, R>,
  ) => useHandlerWithInput('put', `/${name}`, inputClass, handler)

  const remove = useHandlerWithId.bind(null, 'delete', `/${name}/:id`)
  const getById = useHandlerWithId.bind(null, 'get', `/${name}/:id`)

  return {
    router,
    create,
    update,
    remove,
    getById,
    customWithInput: useHandlerWithInput,
    custom: useHandler,
  }
}
