import './css/styles.css';
import { fetchCountries } from './fetchCountries';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputText = document.getElementById("search-box");
const countryList =document.querySelector(".country-list");
const countryInfoDiv = document.querySelector(".country-info");


inputText.addEventListener("input", debounce(()=>{
  let textBoxValue = inputText.value.trim();
  
  if(!textBoxValue){
    console.log("Text box is empty");
    countryList.innerHTML="";
    countryInfoDiv.innerHTML="";
    return
  }
  fetchCountries(textBoxValue)
  
},DEBOUNCE_DELAY));

