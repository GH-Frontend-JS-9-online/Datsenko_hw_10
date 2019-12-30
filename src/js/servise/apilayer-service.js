class ApilayerService {
    constructor() {
        this._apiBase = `http://www.apilayer.net/api/live`
        this._key = `?access_key=07906bf429aa1fdcf30cc8b3e2e4a89c` //999ae317386e92319765439d60d49721
    }
   

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${this._key}${url}`)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json()
    }

    async getCurrencies(fromCurrency, toCurrency) {               
        const currencies = await this.getResource(`&currencies=${fromCurrency},${toCurrency}&source=USD&format=1`)
        return currencies
    }
}

