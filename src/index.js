import './styles.css';
import { fetchCountries, refs, clearDom } from './js/fetch-countries.js'
import '../node_modules/toastr/build/toastr.css';
import debounce from 'lodash.debounce'


let query = ''
 refs.inputСountry.addEventListener('input',debounce(getsNameСountry, 500) )
function getsNameСountry(e) {
    query = e.target.value
    if (query ==='') {
        clearDom()
        return
    }
    fetchCountries()
    clearDom()
}

export { query }



