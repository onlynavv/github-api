### Click here for the [demo V.2](https://github-api-task-v2.netlify.app/) 

## Preview
![image](https://user-images.githubusercontent.com/77113035/138221662-b4e5007d-0c6b-4eb1-8e9b-44a8b1abb134.png)

## DOM element creation
```
const mainSection = document.createElement('section')
document.body.append(mainSection)
```

## Async/Await

async function, where we try to fetch the github api, where async makes the function asynchronous in the synchronous js world, without freezing the entire program

```
const getUsers = async() => {
  const resp = await fetch('https://api.github.com/users/onlynavv/repos')
  const userRepos = await resp.json()
  }
 getUsers()
```

## fetch()

fetch() method to get the response from the api, await will make the function to wait until the promise returns a result, await keyword can be used only inside the async 
function, otherwise it will throw error, it will make the async function to wait not the entire program

```
const resp = await fetch('https://api.github.com/users/onlynavv/repos')
```

## try..catch

try catch block - they are generally used to handle errors in the program, to avoid from an error causing your program, try block executes the lines of code, catch block 
executes the statements if an exception is thrown in the try block

```
try {
  const resp = await fetch('https://api.github.com/users/onlynavv/repos')
  } catch (error) {
                console.log(error)
            }
```

if it is a traditional error like if you have missed/misspelled a word in the url then it will throw a syntax error unexpected token in json, something wrong in the program 
the json can't run on it in fetch even if the response is between 400 - 500 status code which means its an error that we cant get the data back but its not going to throw an 
error, because the fetch can still resolve it gets a response, the only thing the fetch cannot resolve is the response when we try to run json() to that response we get the 
error, then  it will throw the error example: network error will trigger the catch block - TypeError - failed to fetch, resources are failed to fetched

in that traditional case to know what error we can simple throw an error message on our own, by checking if the response ok property is true or false, if false throw the error 
with status and the statusText when the json try to run on that response (unexpected token)

throw - allows us to create own error

```
if(!resp.ok){
            const errMsg = `An error occured '${resp.status}' '${resp.statusText}'`
            throw new Error(errMsg)
        }
```
