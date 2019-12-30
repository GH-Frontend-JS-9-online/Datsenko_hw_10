import Component from './component.js'
import store from '../store/index.js'
import apilayerServise from '../servise/apilayer-service.js'

export default class ConverterComponent extends Component {
    constructor() {
        super(
            store,
            document.querySelector('.app')
        )
        this.isRender = false
    }

    render() {       

        if (this.isRender) {
            return
        } 
        fetch('https://restcountries.eu/rest/v2/')
        .then(res => res.json())
        .then(res => {                     
            const data = new Date()
            this.anchor.innerHTML =
            `<form action="#" id="converter-form">
                <fieldset class="converter-form__container">
                    <h2 class="converter-form_title">Converter Currency</h2>
                    <input type="number" name="amount" placeholder="Amount currency">               
                    <select class="from-currency">
                    ${res.map((res) => `                           
                        <option value="${res.currencies[0].code}">${res.currencies[0].code}</option>
                    `).join('')}       
                    </select>
                    <select class="to-currency">
                    ${res.map((res) => `                           
                        <option value="${res.currencies[0].code}">${res.currencies[0].code}</option>
                    `).join('')} 
                    </select>                    
                    <input type="button" name="convert" class="action-button" value="Convert">
                    <input type="text" name="result" placeholder="">
                    <h2 class="converter-form_title">${data.getDate()} ${store.state.monthNames[data.getMonth()]} ${data.getFullYear()}</h2>                           
                </fieldset>
            </form>`

            this.isRender = true

            const selectedFromCurrency = document.querySelector('.from-currency')           
            const selectedToCurrency = document.querySelector('.to-currency')
            const amountCurrency = document.querySelector('input[name="amount"]')           
            const btnConvertCurrency = document.querySelector('input[name="convert"]')
            const resultConvertInput = document.querySelector('input[name="result"]')
            
            btnConvertCurrency.addEventListener('click', (event) => {
                // event.preventDefault()  
                if (!amountCurrency.value || parseInt(amountCurrency.value) < 0) {
                    alert(`bad amount curency`)
                }
                else {
                    apilayerServise.getCurrencies(selectedFromCurrency.value, selectedToCurrency.value)
                    .then(res => {
                        store.dispatch('getAmountCurrency', amountCurrency.value, store.state)
                        store.dispatch('getUsdFrom', res.quotes[`USD${selectedFromCurrency.value}`], store.state)
                        store.dispatch('getUsdTo', res.quotes[`USD${selectedToCurrency.value}`], store.state)
                        store.dispatch('convertCurrency', store.state)
                        resultConvertInput.value = store.state.currencyAfterConvert     
                    })                   
                }               
            })                        
        })     
    }
}



