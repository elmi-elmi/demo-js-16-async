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


const createImg = function(path){
    return new Promise(function(resolve, reject){
        const imgElement = document.createElement('img');
        imgElement.src = path;
        imgElement.addEventListener('load', function(){
            console.log('img----1')
            document.body.append(imgElement)
            resolve(imgElement)
        })
        imgElement.addEventListener('error',function(){
            reject(new Error('something wrong'))
        })
    }).then(el=> {
        console.log('el----', el)
        document.body.insertAdjacentElement('afterbegin', el)

    })
}


const wait = function(seconds){
    return new Promise(function(resolve,reject){
        setTimeout(resolve(`${seconds}seconds passed`),seconds*1000)
    })
}

createImg('../img/img-1.jpg').then(()=>{
    console.log('image 1 loaded.')
    return wait(1)
}).then(()=>createImg('../img/img-2.jpg'))

// wait(1).then(res=>console.log(res))
