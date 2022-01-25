"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
const renderContry = function (data, className = "") {
  const html = `<article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              data.population / 1_000_000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
};
//
// const getCountryData = function(country){
//     const request = new XMLHttpRequest();
//     request.open('GET',`https://restcountries.com/v2/name/${country}`);
//     request.send();
//
//     request.addEventListener('load', function(){
//         const [data] = JSON.parse(this.responseText);
//         renderContry(data);
//         const [neighbour] = data.borders;
//
//         if(!neighbour)return;
//
//         const request2 = new XMLHttpRequest();
//         request2.open('GET',`https://restcountries.com/v2/alpha/${neighbour}`);
//         request2.send();
//         request2.addEventListener('load',function(){
//             const data = JSON.parse(this.responseText);
//             renderContry(data,'neighbour')
//         })
//     })
//
// }
//

// getCountryData('iran')
// getCountryData('germany')
// const getJSON = function(url,msgError='-----shit------->'){
//     return fetch(url)
//         .then(res=>res.json())
//         .then(data=>{
//             if(data.status ===404) throw new Error(msgError+data.status)
//             console.log(data[0])
//             renderContry(data[0])
//             return data[0]
//         })
// }
const renderError = function (msg) {
  countriesContainer.insertAdjacentHTML("afterbegin", msg);
};

const getJson = function (url) {
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error("--This page not found-->" + res.status);
    return res.json();
  });
};

const getCountryData = function (country) {
  getJson(`https://restcountries.com/v2/name/${country}`)
    // fetch(`https://restcountries.com/v2/name/${country}`)
    //     .then(res=> {
    //         if(!res.ok) throw new Error('--This page not found-->'+res.status)
    //        return res.json()
    //     })
    .then((data) => {
      console.log(data);
      const { status } = data;
      if (status === 404)
        throw new Error("--This country not found-->" + status);
      // if(!data.ok) throw new Error('Country not found men!!!!!!')
      console.log(data);

      renderContry(data[0]);

      const neighbour = data[0].borders[0];

      return getJson(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then((data) => {
      console.log(data);
      const { status } = data;
      if (status === 404)
        throw new Error("--This country not found-->" + status);
      renderContry(data, "neighbour");
    })
    .catch((err) => {
      console.error(
        err + " Don't worry! Sometimes maybe good Sometimes maybe shit"
      );
      renderError(
        `Oh shit, Something fucked, ${err.message}. Do not try again!`
      );
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

// btn.addEventListener('click',function(){
//
// })

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//         console.log('-------')
//       console.log(response);
//
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders[0];
//       const neighbour = 'dfsdfdef';
//
//       if (!neighbour) return;
//
//       // Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//
//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

getCountryData("iran");
