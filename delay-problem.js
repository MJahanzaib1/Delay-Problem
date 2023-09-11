function delayedPromiseChain(promiseFunctions, delay) {

    if(promiseFunctions.length === 0)
        return Promise.resolve();

    const [currentPromiseFn, ...remainingPromiseFns] = promiseFunctions;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          currentPromiseFn()
            .then(() => {
                delayedPromiseChain(remainingPromiseFns, delay)
                  .then(resolve)
                  .catch(reject);
            })
            .catch(reject);
        }, delay);
      });
}

const promise1 = () => new Promise(resolve => setTimeout(() => resolve(1), 1000));

const promise2 = () => new Promise(resolve => setTimeout(() => resolve(2), 500));

const promise3 = () => new Promise(resolve => setTimeout(() => resolve(3), 800));

const promise4 = () => new Promise(resolve => setTimeout(() => resolve(4), 300));

const promiseFunctions = [promise1, promise2, promise3, promise4];

const delay = 1000;
let date = new Date;
let currentTime = date.getSeconds();
delayedPromiseChain(promiseFunctions, delay)
  .then(() => console.log("All promises resolved"))
  .catch(error => console.error("Error:", error));