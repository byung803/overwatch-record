const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Something went wrong'); 
    }, 3000);
});

console.log(promise);
console.log(promise.then);

console.log('before');

promise.then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
});

console.log('after');