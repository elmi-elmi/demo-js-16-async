"use strict";

// Challenge 1
/*
const lat = 52.508;
const lng = 13.381;

fetch(`https://geocode.xyz/${lat},${lng}?json=1 `)
    .then(res=> {
        console.log(res)
    if(res.status === 403) throw new Error('Too many request pedasag!')
        return res.json()
    })
    .then(data=> {
        console.log(data)
        console.log(`You are in ${data["city"]}, ${data['country']}`)
    })
    .catch(err=>console.error(`oh shit, ${err.message}`))

 */

// challenge 2

const createImg = function (path) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = path;
    img.addEventListener("load", function () {
      document.body.append(img);
      console.log(img);
      resolve(img);
    });
    img.addEventListener("error", function () {
      reject(new Error("something wrong"));
    });
  });
};

const wait = function (seconds) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve(`${seconds}seconds passed`), seconds * 1000);
  });
};

// createImg('../img/img-1.jpg').then(()=>{
//     console.log('image 1 loaded.')
//     return wait(1)
// }).then(()=>createImg('../img/img-2.jpg'))
//
// // wait(1).then(res=>console.log(res))

// Challenge 3

const imgPathArr = ["../img/img-1.jpg", "../img/img-2.jpg", "../img/img-3.jpg"];

const loadAll = async function (imgArr) {
  // const imgsWithMap = imgArr.map(async (path) => await createImg(path));
  //   const imgsWithMap = await imgArr.map( (path) =>  createImg(path));
    const imgsWithMap =  imgArr.map( (path) =>  createImg(path));
    console.log(await imgsWithMap)
  const imgs = await Promise.all(imgsWithMap);
  console.log(imgs);
};

loadAll(imgPathArr);
