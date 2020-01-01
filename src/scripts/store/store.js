import Observer from "./observer.js"

export default class Store {
    constructor(reducers) {
        this.reducers = reducers
        this.state = {             
            monthNames: ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ],
            amountCurrency: 0,
            usdFrom: 0,
            usdTo: 0,
            currencyAfterConvert: ''            
        }

        this.events = new Observer()
    }


    dispatch(actionType, payload) {
        if (this.reducers[actionType]) {
            this.state = this.reducers[actionType](payload, this.state)
            this.events.next('change', this.state)
        }
    }
}