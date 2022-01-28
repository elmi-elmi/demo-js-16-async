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
  countriesContainer.style.opacity = 1;
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

// getCountryData("iran");

/*


const whereAmI = function(lat, lng){
    return fetch(`https://geocode.xyz/${lat},${lng}?json=1 `)
        .then(res=> {
            console.log(res)
            if(res.status === 403) throw new Error(`Too many request pedasag, ${res.status}  .`)
            return res.json()
        })
        .then(data=> {
            console.log(data)
            console.log(`You are in ${data["city"]}, ${data['country']}`)
            return data['country']
        })
        .then(country=>getCountryData(country))
        .catch(err=>console.error(`oh shit, ${err.message}`))


}

const lat = 52.508;
const lng = 13.381;

const country = whereAmI(lat,lng);
// console.log('--->',country)
// getCountryData(country)
*/

/*
console.log('Test start (call stack)');
setTimeout(()=>console.log('0 seconde time (callback queue priority)'),0);
Promise.resolve('Resolve promise 1 (microtask queue priority)').then(res=>console.log(res))
Promise.resolve('Resolve promise 2 (microtask queue priority)').then(res=>console.log(res))
Promise.resolve('Resolve promise 3 (microtask queue priority)').then(res=>console.log(res))
Promise.resolve('Resolve promise 4 (microtask queue priority)').then(res=>console.log(res))
Promise.resolve('Resolve promise 5 (microtask queue priority)').then(res=>console.log(res))
Promise.resolve('Resolve promise 6 (microtask queue priority)').then(res=>console.log(res))
console.log('Test end (call stack)');
console.log('Test end (call stack)');
console.log('Test end (call stack)');
console.log('Test end (call stack)');
console.log('Test end (call stack)');
console.log('Test end (call stack)');
console.log('Test end (call stack)');
console.log('Test end (call stack)');
console.log('Test end (call stack)');
console.log('Test end (call stack)');
console.log('Test end (call stack)');
for(let i=1; i<1000; i++){
    console.log('')
}

 */
/*
const lottery = new Promise(function (resolve, reject) {
  console.log("lottery draw is happening");
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve("You win ....");
    } else {
      reject(new Error("fuck You lost"));
    }
  }, 1000);
});

lottery
  .then((res) => console.log(res))
  .catch((err) => console.error(err.message));

const wait = function (seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds*1000));
};

wait(1)
  .then(()=> {
      console.log("1 seconds passed")
      return wait(1)
  })
  .then(()=> {
      console.log("2 seconds passed")
      return wait(1)
  })
  .then(()=> {
      console.log("3 seconds passed")
      return wait(1)
  })
  .then(()=> {
      console.log("4 seconds passed")
  });


 */
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(res=>console.log(res)).catch(err=>console.error(err.message))

const whereAmI = function () {
  getPosition()
    .then((pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?json=1 `);
    })
    .then((res) => {
      if (res.status === 403)
        throw new Error(`Too many request pedasag, ${res.status}  .`);
      return res.json();
    })
    .then((data) => {
      console.log(`You are in ${data["city"]}, ${data["country"]}`);
      return data["country"];
    })
    .then((country) => getCountryData(country))
    .catch((err) => console.error(`oh shit, ${err.message}`));
};

 */

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getJson(`https://restcountries.com/v2/name/${country}`)
//
// return fetch(`https://geocode.xyz/${lat},${lng}?json=1 `)

const whereAmI = async function () {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?json=1 `);
    console.log(resGeo);
    if (!resGeo.ok)
      throw new Error(`Too many request, status: ${resGeo.status} `);
    const dataGeo = await resGeo.json();
    const country = dataGeo["country"];
    const resCountryData = await fetch(
      `https://restcountries.com/v2/name/${country}`
    );
    if (!resCountryData.ok)
      throw new Error(`Geo location not found, status: ${resGeo.status} `);
    const dataCountry = await resCountryData.json();
    renderContry(dataCountry[0]);
    return `You in ${country}`;
  } catch (err) {
    console.log(err.message);
    renderError("-----error render------");
    throw err;
  }
};

// btn.addEventListener("click", whereAmI);
// whereAmI().then(city=>console.log(city)).catch(err=>console.log('hhhhhhh'+err.message))
/*
(async function () {
  try {
    const city = await whereAmI();
    console.log(city);
  } catch (err) {
    console.log("hhhhhhh" + err.message);
  }
})();

const getCountriesData = async function (c1, c2, c3) {
  const data = await Promise.all([
    getJson(`https://restcountries.com/v2/name/${c1}`),
    getJson(`https://restcountries.com/v2/name/${c2}`),
    getJson(`https://restcountries.com/v2/name/${c3}`),
  ]);

  console.log(data.map(d=>d[0].capital))

};

getCountriesData('iran','germany','canada')

 */

// (async function(){
//   const data = await Promise.race([
//     getJson(`https://restcountries.com/v2/name/iran`),
//     getJson(`https://restcountries.com/v2/name/canada`),
//     getJson(`https://restcountries.com/v2/name/mexico`),
//   ])
//   console.log(data)
// })();

Promise.race([
  Promise.resolve("race fastest response fulfill (and return one response)"),
  Promise.reject("Error"),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err.message));

Promise.race([
  Promise.reject(new Error("race fastest response reject")),
  Promise.resolve("Success"),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err.message));

Promise.allSettled([
  Promise.reject("allSettled fastest response reject"),
  Promise.resolve("allSettled second response fulfilled"),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err.message));

Promise.allSettled([
  Promise.resolve("allSettled fastest response fulfilled"),
  Promise.reject("allSettled second response rejected"),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err.message));

Promise.any([
  Promise.resolve(
    "any fastest response fulfilled (and return first fulfilled response)"
  ),
  Promise.reject("avy second response reject"),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err.message));

Promise.any([
  Promise.reject("any fastest response rejected"),
  Promise.resolve(
    "first fulfill response is second response(return first fulfilled response)"
  ),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err.message));
