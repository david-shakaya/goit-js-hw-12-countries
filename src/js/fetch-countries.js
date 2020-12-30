import listCountriesTemplate from '../templates/list-Cts-Template.hbs';
import oneCountryTemplate from '../templates/one-Cty-Template.hbs';
import { query } from '../index.js'
import toastr, { error } from 'toastr';
     
const clearDom = () => refs.markupFromTempl.innerHTML = ''

 const refs = {
    wrapperMarkup: document.querySelector('.wrapper-country-js'),
    markupFromTempl: document.querySelector('.markup-from-templ'),
    inputСountry:document.querySelector('.form-name-country-js'),
}

function fetchCountries() {
    fetch(`https://restcountries.eu/rest/v2/name/${query}`)
    .then(response => response.json())
        .then(data => {
        if (data.status === 404) {
                showToastrError()
                return
        }
        if (data.length === 1) {
            clearDom()
            const markup = oneCountryTemplate(data)
            refs.markupFromTempl.insertAdjacentHTML('beforeend', markup)
        }
        if (data.length > 1 && data.length<10) {
            const markup = listCountriesTemplate(data)
            refs.markupFromTempl.insertAdjacentHTML('beforeend', markup)
        } 
        if (data.length > 10) {
            showToastrInfo()
        }
    })
}
export { fetchCountries, refs, clearDom };

     toastr.options = {
        "progressBar": true,
        "showDuration": "0",
        "timeOut": "2500",
        "showMethod": "show",
    }
const showToastrInfo = () => toastr["warning"]("Введите более конкретный запрос", "Слишком много совпадений")
const showToastrError = () =>error("Уточните запрос","Ошибка!Такой страны не существует")