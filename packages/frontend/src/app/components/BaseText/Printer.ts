
export class Printer {
    isActive = false
    private index = 0
    constructor(
        private readonly text: string,
        private readonly setView: (view: string) => void,
    ) {
        this.setView('')
    }

    next() {
        this.setView(this.text.slice(0, ++this.index))
    }

    get isComplete() {
        return this.index === this.text.length
    }

    remove() {
        this.isActive = false
        this.index = this.text.length
    }
}
