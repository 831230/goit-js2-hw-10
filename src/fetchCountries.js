import Notiflix from 'notiflix';

const countryList =document.querySelector(".country-list");
const countryInfoDiv = document.querySelector(".country-info");

// const FETCH_URL = "https://restcountries.com/v3.1/name/";
const FETCH_URL_FILTERS = "https://restcountries.com/v2/name/";
const FILTERS = "?fields=name,capital,population,flags,languages";

class CountryDetail{
  constructor(name, flags, capital, population, languages){
    this.name=name,
    this.flags=flags,
    this.capital=capital,
    this.population=population,
    this.languages=languages
  }
};

export function fetchCountries(name){
        fetch(FETCH_URL_FILTERS+name+FILTERS)
        .then((response)=>{
          if(!response.ok){
            throw new Error(response.status)
          }
          return response.json();
        })
        .then((country)=>{
          let countryName =[] ;
          country.forEach((countryEl)=>{
            const countryDetailsObj=new CountryDetail(countryEl.name, countryEl.flags.svg, countryEl.capital, countryEl.population, countryEl.languages)
            countryName.push(countryDetailsObj)
          });
          return countryName;
        })
        .then((data)=>{
          let countryListHTML="";
          data.forEach((country)=>{
            countryListHTML+=`<li class="country-item"><img src="${country.flags}" height="18px" style="margin-right: 15px;"></img>${country.name}</li>`
          });
          if(data.length>10){
            countryList.innerHTML="";
            countryInfoDiv.innerHTML="";
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            return
          };
          if(data.length==1){
            let countryInfo = "";
            data.forEach((country)=>{
              countryInfo+=
              `
              <p class="country-info-title">Capital&#58<span class="country-info-content">${country.capital}</span></p>
              <p class="country-info-title">Population&#58<span class="country-info-content">${country.population}</span></p>
              <p class="country-info-title">Languages&#58<span class="country-info-content">${country.languages.map((element)=>{return element.name})}</span></p>
              `
            });
            countryInfoDiv.innerHTML=countryInfo;
          };
          countryList.innerHTML=countryListHTML;
          if(data.length!==1){
            countryInfoDiv.innerHTML="";
          }
        })
        .catch((error)=>{
          countryInfoDiv.innerHTML="";
          countryList.innerHTML="";
          Notiflix.Notify.failure(error)
        })
      };