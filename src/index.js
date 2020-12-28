import './styles.css';
// import countriesTempl from './templates/template.hbs'
import listCountriesTemplate from './templates/list-Cts-Template.hbs';
import oneCountryTemplate from './templates/one-Cty-Template.hbs';



const refs = {
    wrapperMarkup: document.querySelector('.wrapper-country-js'),
    markupFromTempl: document.querySelector('.markup-from-templ'),
    inputСountry:document.querySelector('.form-name-country-js'),
}


let country= ''

refs.inputСountry.addEventListener('input', getsNameСountry)
function getsNameСountry(e) {
    country = e.target.value
    if (country ==='') {
        refs.markupFromTempl.innerHTML = ''
        return
    }
    refs.markupFromTempl.innerHTML = ''
    fetchCountries()
}

function fetchCountries() {
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
        console.log(data.languages);
        if (data.length > 1 && data.length<10) {
            const markup = listCountriesTemplate(data)
            refs.markupFromTempl.insertAdjacentHTML('beforeend', markup)
        } 
        if (data.length === 1) {
              console.log(data.languages);
            const markup = oneCountryTemplate(data)
             refs.markupFromTempl.insertAdjacentHTML('beforeend', markup)
             console.log('Длина 1');
        }
    })
}