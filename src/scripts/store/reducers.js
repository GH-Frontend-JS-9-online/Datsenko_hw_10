
export default function createReducers() {
  
    return {     

        getAmountCurrency: (amountCurrency, state) => {            
            return({
                ...state,
                amountCurrency: parseInt(amountCurrency)
            })
        },

        getUsdFrom: (payload, state) => {           
            return({
                ...state,
                usdFrom: 1 / payload * 100
            })
        },

        getUsdTo: (payload, state) => {
            
            return({
                ...state,
                usdTo: payload
            })
        },

        convertCurrency: (state) => {            
            return({
                ...state,
                currencyAfterConvert: (state.usdTo * state.usdFrom).toFixed(2)
            })
        }
    }
}