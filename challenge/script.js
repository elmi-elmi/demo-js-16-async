"use strict";

// Challenge 1

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
