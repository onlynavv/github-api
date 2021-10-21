/**
 * main section - section
 * DOM element creation appended to the body
 */

const mainSection = document.createElement('section')
document.body.append(mainSection)

/**
 * main div - div - container 
 * DOM element creation appended to the main section
 */

const mainDiv = document.createElement('div')
mainSection.append(mainDiv)
mainDiv.setAttribute('class','container-fluid')

/**
 * main row - div - row
 * DOM element creation appended to the main div
 */

const mainRow = document.createElement('div')
mainRow.setAttribute('class','row')
mainDiv.append(mainRow)

/**
 * user info div - div 
 * DOM element creation appended to the main row
 */

const userInfoDiv = document.createElement('div')
userInfoDiv.setAttribute('class','col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 user-info')

/**
 * user repo div - div
 * DOM element creation appended to the main row
 */

const userRepoDiv = document.createElement('div')
userRepoDiv.setAttribute('class','col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-9 user-repos')

/**
 * user repo row - div 
 * DOM element creation appended to the user repo row
 */

const userRepoRow = document.createElement('div')
userRepoRow.setAttribute('class','row user-repo-row')


mainRow.append(userInfoDiv,userRepoDiv)
userRepoDiv.append(userRepoRow)

/**
* function to  get a user repo's from github api
*
* getUsers is a async function, where we try to fetch the github api, where async makes the function asynchronous in the synchronous js world, without freezing the entire program
*/

const getUsers = async() => {

    /**
        * try catch block - they are generally used to handle errors in the program, to avoid from an error causing your program, try block executes the lines of code, catch block executes the statements if an exception is thrown in the try block
        *
        * if it is a traditional error like if you have missed/misspelled a word in the url then it will throw a syntax error unexpected token in json, something wrong in the program the json can't run on it
        * in fetch even if the response is between 400 - 500 status code which means its an error that we cant get the data back but its not going to throw an error, because the fetch can still resolve it gets a response, the only thing the fetch cannot resolve is the response when we try to run json() to that response we get the error, then  it will throw the error
        * example: network error will trigger the catch block - TypeError - failed to fetch, resources are failed to fetched
        *
        * in that traditional case to know what error we can simple throw an error message on our own, by checking if the response ok property is true or false, if false throw the error with status and the statusText when the json try to run on that response (unexpected token)
        *
        * throw - allows us to create own error
     */

    try {

        /**
            * fetch() method to get the response from the api, await will make the function to wait until the promise returns a result, await keyword can be used only inside the async function, otherwise it will throw error, it will make the async function to wait not the entire program
            *
            * @param {string} url - github api url
         */

        const resp = await fetch('https://api.github.com/users/onlynavv/repos')
        console.log(resp)
        if(!resp.ok){
            const errMsg = `An error occured '${resp.status}' '${resp.statusText}'`
            throw new Error(errMsg)
        }
        const userRepos = await resp.json()

        try {
            const userInfoResp = await fetch('https://api.github.com/users/onlynavv')
            console.log(resp)
            if(!resp.ok){
                const errMsg = `An error occured '${resp.status}' '${resp.statusText}'`
                throw new Error(errMsg)
            }

            const userInfoData = await userInfoResp.json()

            userInfoDiv.innerHTML = `
                    <div class="container user-info-div">
                        <div class="col-12 user-img">
                            <img src="${userInfoData.avatar_url}" alt="${userInfoData.login}">
                        </div>
                        
                        <div class='col-12'>
                            <h4>${userInfoData.name}</h4>
                            <p class="username">${userInfoData.login}</p>
                            <p>${userInfoData.bio}</p>

                            <p><i class="far fa-building"></i> ${userInfoData.company}</p>
                            <p><i class="fas fa-map-marker-alt"></i> ${userInfoData.location}</p>
                            <p><i class="fas fa-link"></i> <a href="${userInfoData.blog}" target="_blank">${userInfoData.blog}</a></p>
                        </div>
                    </div>
                `

            /**
             * map() function - goes throw the array list each and every item in that array, for each item we are appending the div's which we have created using innerHTML
             */
            
            userRepos.map((repo)=>{

                /**
                 * ternary operator ?: - here used to check if the property in the json value is present make use of that value, if not present leave/have alternate text to that field, this is because sometimes in json we might see missing property for some objects, they can lead to error in some cases while iterating to avoid that we can use this, this can also be done using "optional chaining" method ?. , only if it is present display it to the user otherwise don't
                 */

                const description = repo.description ? repo.description : 'no description'

                userRepoRow.innerHTML += `
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="single-repo" id=${repo.id}>
                                <h5><a href='${repo.html_url}' target="_blank">${repo.name}</a></h5>
                                <p>${description}</p>
                                <div class="count-row">
                                    <p><i class="fas fa-star"></i> ${repo.stargazers_count}</p>
                                    <p><i class="fas fa-code-branch"></i> ${repo.forks_count}</p>
                                <div>
                            </div>
                        </div>
                `
            })   
            
            } catch (error) {
                console.log(error)
            }
        
    } catch (error) {
        console.log(error)
    }


}

getUsers()