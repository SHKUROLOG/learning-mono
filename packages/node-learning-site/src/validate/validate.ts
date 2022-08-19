import { plainToInstance } from 'class-transformer'
import { ClassConstructor } from 'class-transformer/types/interfaces/class-constructor.type'
import { validate } from 'class-validator'
import { Request, Response, Router } from 'express'

type RequestWithInput<T> = Request & {
  input: T
}

type Method = 'get' | 'post' | 'put' | 'delete'

type Handler<T> = (req: RequestWithInput<T>, res: Response) => Promise<void> | void

type BaseHandler = (req: Request, res: Response) => Promise<void> | void

const themeRoute = defineRoute('theme')

export function defineRoute(name: string) {
  const router = Router()

  function useHandlerWithInput<T extends object>(
    method: Method,
    path: string,
    inputClass: ClassConstructor<T>,
    handler: Handler<T>,
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

      await handler(reqWithInput, res)
    })
  }

  function useHandler(
    method: Method,
    path: string,
    handler: BaseHandler,
  ) {
    router[method](path, async (req, res) => {
      try {
        await handler(req, res)
      } catch (error) {
        res.status(500).json({ error })
      }
    })
  }

  const create = useHandlerWithInput.bind(null, 'post', `/${name}`)
  const update = useHandlerWithInput.bind(null, 'put', `/${name}`)
  const remove = useHandler.bind(null, 'delete', `/${name}/:id`)
  const getById = useHandler.bind(null, 'get', `/${name}/:id`)

  return {
    router,
    create,
    update,
    remove,
    getById,
    custom: useHandlerWithInput,
  }
}
//
// route.create()
//
// route.create(CreateThemeInput, (req: Req<CreateThemeInput>, res) => themeService.createTheme(req.input))
//
// /// #########/// #########/// #########/// #########
//
// const route = Route()
//
// answerRoute.post('/answer', async (req, res) => {
//   const error = validateClass(CreateAnswerInput, req, res)
//
//   const createdAnswer = await createAnswer(request)
//   res.json(createdAnswer)
// })
//
// export async function validateClass<T extends object>(
//   validateClass: ClassConstructor<T>,
//   req: RequestWithInput<T>,
//   res: Response<T>,
// ): Promise<Response<T> | undefined> {
//   const input = plainToInstance(validateClass, req.body)
//   const errors = await validate(request)
//   if (errors.length)
//     return res.status(400).json({ errors })
//   req.input = input
//   try {
//     await handler(req, res)
//   } catch (error) {
//     res.status(500).json({ error })
//   }
// }
