/* eslint-disable max-statements */
import 'reflect-metadata'
import { PrintManager } from './PrintManager'

describe('PrintManager', () => {
  // it('should run generator', async () => {
  //   const innerFn = vi.fn()
  //   const count = 10
  //   const printManager = new PrintManager()

  //   const fn = vi.fn(function* () {
  //     let i = count
  //     while (i--)
  //       yield innerFn()
  //   })

  //   printManager.add(fn)
  //   await new Promise(resolve => printManager.once('end', resolve))
  //   expect(fn.mock.calls).toHaveLength(1)
  //   expect(innerFn.mock.calls).toHaveLength(count)
  // })

  // it('running multiple generators', async () => {
  //   const count = 10
  //   let amount = 10
  //   const printManager = new PrintManager()

  //   const innerFn = vi.fn(function* (): any {
  //     let i = count
  //     while (i--)
  //       yield vi.fn()
  //   })

  //   while (amount--) {
  //     printManager.add(innerFn)
  //     printManager.remove(innerFn)

  //     await new Promise(resolve => printManager.once('end', resolve))
  //   }

  //   // expect(fn.mock.calls).toHaveLength(amount)
  //   expect(innerFn.mock.calls).toHaveLength(count)
  // })

  it('running multiple generators with stop run', async () => {
    const lettersCount = 10
    const breakAt = 5

    const printManager = new PrintManager()

    const fnComplete = vi.fn()
    const fnNotComplete = vi.fn(() => console.log('fn not complete'))

    const genComplete = vi.fn(function* (): any {
      let i = lettersCount

      while (i-- && !(yield))
        fnComplete()
    })

    const genNotComplete = function* (): any {
      let i = lettersCount

      while (i--) {
        const qwe = yield
        console.log('gen inside', qwe)

        if (i === breakAt)
          printManager.remove(genNotComplete)
        // printManager.add(genComplete)

        fnNotComplete()
      }
      console.log('gen end')
    }

    printManager.add(genNotComplete)

    await new Promise(resolve => printManager.once('end', resolve))

    expect(fnNotComplete.mock.calls).toHaveLength(breakAt)
    expect(fnComplete.mock.calls).toHaveLength(lettersCount)
  })
})
