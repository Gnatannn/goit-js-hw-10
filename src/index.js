import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

// console.log('dddd');
// console.log('aaaddddііііadddd');

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

// console.log(refs.countryInfo);

refs.input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(evt) {
  evt.preventDefault();
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
  const inputText = refs.input.value.trim();
  //   console.log(inputText);

  if (inputText !== '') {
    fetchCountries(inputText)
      .then(country => {
        // console.log(country.length);
        if (country.length >= 10) {
          Notiflix.Notify.info('oops, too many countries');
        }
        if (country.length >= 2 && country.length < 10) {
          renderCountryList(country);
        }
        if (country.length === 1) {
          console.log(country);
          renderCountryInfo(country);
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  } else {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
  }

  // if ()
}

// function onIputError(error) {}

function renderCountryList(country) {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';

  const countryListMarcup = country
    .map(({ flags, name }) => {
      return `<li class="country-list" ><p class="country-list__item"><img src="${flags.svg}" width="25px" height="15px" alt="${name.common}" class="country-list__flag">${name.common}</p></li>`;
    })
    .join('');

  refs.countryList.insertAdjacentHTML('afterbegin', countryListMarcup);
}

function renderCountryInfo(country) {
  refs.countryList.innerHTML = '';

  const countryInfoMarcup = country
    .map(({ name, capital, population, flags, languages }) => {
      if (name.common === 'Russia') {
        name.common = 'Russia is a terrorist state';
      }
      return `<ul class="list">
        <li class="country-info" ><p class="country-info__item-name"><img src="${
          flags.svg
        }" width="60px" height="40px" alt="${
        name.common
      }" class="country-info__flag">${name.common}</p></li>          
        <li class="country-info" ><p class="country-info__item">Capital: <span class="country-info__item-text">${capital}</span></p></li>          
        <li class="country-info" ><p class="country-info__item">Capital: <span class="country-info__item-text">${population}</span></p></li>          
        <li class="country-info" ><p class="country-info__item">Capital: <span class="country-info__item-text">${Object.values(
          languages
        )}</span></p></li>          
    </ul>`;
    })
    .join('');

  console.log(countryInfoMarcup);

  refs.countryInfo.insertAdjacentHTML('afterbegin', countryInfoMarcup);
}
