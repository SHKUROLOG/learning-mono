import { PrismaClient } from '@prisma/client'

export enum Deps {
  PRISMA = 'PRISMA',
}

interface DepMap {
  [Deps.PRISMA]: PrismaClient
}

const depMap = new Map<string, object>()

export function provide<T extends Deps>(key: T, value: DepMap[T]) {
  depMap.set(key, value)
}

export function inject<T extends Deps>(key: T): DepMap[T] {
  if (!depMap.has(key))
    throw new Error(`no key, provide ${key}`)

  return depMap.get(key)! as DepMap[T]
}
