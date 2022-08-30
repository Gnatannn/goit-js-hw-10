export function fetchCountries(name) {
  const mainUrl = 'https://restcountries.com/v3.1/name/';
  const searchFilter = '?fields=name,capital,population,flags,languages';
  return fetch(`${mainUrl}${name}${searchFilter}`).then(responce => {
    if (!responce.ok) {
      throw new Error(responce.status);
    }
    return responce.json();
  });
}
