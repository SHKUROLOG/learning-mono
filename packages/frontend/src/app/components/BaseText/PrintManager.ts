import { wait } from '@learning-mono/shared'
import { Printer } from './Printer'

export class PrintManager {
  private queue: Printer[] = []
  private isRunning = false

  add(printer: Printer) {
    this.queue.push(printer)

    this.tryRun()
  }

  remove(printer: Printer) {
    this.queue = this.queue.filter((el) => el !== printer)
    printer.remove()
  }

  private async tryRun() {
    if (this.isRunning)
      return

    this.isRunning = true
    await this.run()
    this.isRunning = false
  }

  private async run() {
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
  }
}

export const printManager = new PrintManager()
