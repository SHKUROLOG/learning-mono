import { wait } from '@learning-mono/shared'
import EventEmitter from 'events'
import { Printer } from './Printer'

export class PrintManager extends EventEmitter {
  private queue: Printer[] = []
  private isRunning = false

  add(printer: Printer) {
    console.log('add', printer.text)
    this.queue.push(printer)
    console.table([...this.queue])

    this.run()
  }

  remove(printer: Printer) {
    console.log('remove', printer.text)

    this.queue = this.queue.filter((el) => el !== printer)
    printer.remove()
    console.table([...this.queue])
  }

  // eslint-disable-next-line max-statements
  private async run() {
    if (this.isRunning)
      return
    console.group('run')

    this.isRunning = true

    // eslint-disable-next-line no-cond-assign
    console.log('start outer while')

    let printer: Printer | undefined

    while (printer = this.queue.shift()) {
      printer.isActive = true

      while (!printer.isComplete) {
        printer.next()
        await wait(10)
      }

      printer.isActive = false
      await wait(10)
    }
    console.log('end outer while')

    this.isRunning = false
    this.emit('end')
    console.groupEnd('run')
  }
}

export const printManager = new PrintManager()
