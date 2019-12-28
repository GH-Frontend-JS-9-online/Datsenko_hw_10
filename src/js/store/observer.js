export default class Observer {
    constructor() {
        this.sibscribers = {}
    }

    subscribe(event, callback) {
        if (!this.sibscribers[event]) {
            this.sibscribers[event] = []
        }
        this.sibscribers[event].push(callback)
    }

    unsubscribe(event, callback) {
        if (this.sibscribers[event]) {
            this.sibscribers[event] = this.sibscribers[event].filter(cb => cb !== callback)
        }
    }

    next(event, value) {
        if (!this.sibscribers[event]) {
            console.warn('Even not supported', event)
            return
        }
        this.sibscribers[event].forEach(cb => cb(value))
    }
}