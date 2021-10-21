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
 * main row - div - row - search row
 * DOM element creation appended to the main div
 */

const searchDiv = document.createElement('div')
searchDiv.setAttribute('class','row')
mainDiv.append(searchDiv)

/**
 * main row - div - row
 * DOM element creation appended to the main div
 */

const mainRow = document.createElement('div')
mainRow.setAttribute('class','row')
mainDiv.append(mainRow)

/**
 * form
 * gets the input from the user and submit it for search
 */

/**
 * function to submit the value and search for the user
 * onclick event that calls the function when there is an event click, that function is called as the callback funciton
 */

searchDiv.innerHTML = `
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <form class="form-div">
                <div class="textField form-group row">
                    <label for="search" class="col-sm-4 col-form-label">Search Username:</label>
                    <input type="text" placeholder="Enter Username..." id="search" name="search" class="col-sm-8 form-control">
                </div>
                <div class="form-group row search-btn">
                    <button onclick="searchUser(event)"><i class="fas fa-search"></i> Search</button>
                </div>
            </form>
        </div>
`

/**
* function to  get a user repo's from github api
*
* getUsers is a async function, where we try to fetch the github api, where async makes the function asynchronous 
* in the synchronous js world, without freezing the entire program
*/

const getUsers = async() => {

    mainRow.innerHTML = ''

    const userRepoDiv = document.createElement('div')
    userRepoDiv.setAttribute('class','col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 user-repos')

    const userRepoRow = document.createElement('div')
    userRepoRow.setAttribute('class','row user-repo-row')

    const heading = document.createElement('h2')
    heading.innerText = 'Github Users'
    heading.setAttribute('class','main-heading')
    userRepoRow.append(heading)

    mainRow.append(userRepoDiv)
    userRepoDiv.append(userRepoRow)

    /**
        * try catch block - they are generally used to handle errors in the program, to avoid from an error causing 
        * your program, try block executes the lines of code, catch block executes the statements if an exception 
        * is thrown in the try block
        *
        * if it is a traditional error like if you have missed/misspelled a word in the url then it will throw a 
        * syntax error unexpected token in json, something wrong in the program the json can't run on it
        * in fetch even if the response is between 400 - 500 status code which means its an error that we cant get 
        * the data back but its not going to throw an error, because the fetch can still resolve it gets a response, 
        * the only thing the fetch cannot resolve is the response when we try to run json() to that response we get 
        * the error, then  it will throw the error
        * example: network error will trigger the catch block - TypeError - failed to fetch, resources are failed
        * to fetched
        *
        * in that traditional case to know what error we can simple throw an error message on our own, by checking if 
        * the response ok property is true or false, if false throw the error with status and the statusText when the 
        * json try to run on that response (unexpected token)
        *
        * throw - allows us to create own error
     */

    try {

        /**
            * fetch() method to get the response from the api, await will make the function to wait until the promise 
            * returns a result, await keyword can be used only inside the async function, otherwise it will throw error, 
            * it will make the async function to wait not the entire program
            *
            * @param {string} url - github api url
         */

        const resp = await fetch('https://api.github.com/users')
        console.log(resp)
        if(!resp.ok){
            const errMsg = `An error occured '${resp.status}' '${resp.statusText}'`
            throw new Error(errMsg)
        }
        const userRepos = await resp.json()
        
        userRepos.map((repo)=>{

            const {login} = repo

            userRepoRow.innerHTML += `
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                        <div class="single-repo" id=${repo.id}>
                            <div class="row user-row">
                                <div class="col-4">
                                    <img src="${repo.avatar_url}" alt="${repo.login}">
                                </div>
                                <div class="col-8 user-display">
                                    <h5>${repo.login}</h5>
                                    <button class="view-btn" onclick='getUserDetail(\"${repo.login}\" )'>View Repo's</button>
                                </div>
                            </div>
                        </div>
                    </div>
            `
        })   
    } catch (error) {
        console.log(error)
    }


}

getUsers()

/**
 * 
 * @param {event} event 
 * preventDefault() to prevent the browser from submitting the form which triggers the reloading of the page
 * onclick the searchUser() function called and here the input value is read and then again a function is called to get 
 * that user details with the search input as parameter
 * a function is called inside a function is called as callback function
 */

const searchUser = async(event) => {
    event.preventDefault()

    const enteredUser = document.getElementById('search').value
    console.log(enteredUser)

    /**
     * function call to get the user details takes a arguement searched input
     */

    getUserDetail(enteredUser)

    document.getElementById('search').value = ''
}

/**
 * function to get the user detail
 * @param {string} login takes a string as a parameter, called when a button click for view repo is happened and also for 
 * search user, function is reused here
 */

const getUserDetail = async(login) => {
    console.log(login)

    mainRow.innerHTML = ''

    

    const userInfoDiv = document.createElement('div')
    userInfoDiv.setAttribute('class','col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 user-info')

    const userRepoDiv = document.createElement('div')
    userRepoDiv.setAttribute('class','col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-9 user-repos')

    const userRepoRow = document.createElement('div')
    userRepoRow.setAttribute('class','row user-repo-row')

    mainRow.append(userInfoDiv,userRepoDiv)
    userRepoDiv.append(userRepoRow)

    const getUsers = async() => {

        /**
         * parameter value is added to the url using template strings
         * nested try catch block is allowed in js
         */

        try {
            const resp = await fetch(`https://api.github.com/users/${login}/repos`)
            console.log(resp)
            if(!resp.ok){
                const errMsg = `An error occured '${resp.status}' '${resp.statusText}'`
                throw new Error(errMsg)
            }
            const userRepos = await resp.json()

            const userInfoResp = await fetch(`https://api.github.com/users/${login}`)
            const userInfoData = await userInfoResp.json()

            const {company,location,blog,bio} = userInfoData

            const companyName = company ? company : '-'
            const locationName = location ? location : '-'
            const blogName = blog ? blog : '-'
            const bioData = bio ? bio : '- no bio -'

            userInfoDiv.innerHTML = `
                    <div class="container user-info-div">
                    
                        <div class="col-12 user-img">
                            <img src="${userInfoData.avatar_url}" alt="${userInfoData.login}">
                        </div>
                        
                        <div class='col-12'>
                            <h4>${userInfoData.name}</h4>
                            <p class="username">${userInfoData.login}</p>
                            <p>${bioData}</p>

                            <p><i class="far fa-building"></i> ${companyName}</p>
                            <p><i class="fas fa-map-marker-alt"></i> ${locationName}</p>
                            <p><i class="fas fa-link"></i> <a href="${blogName}" target="_blank">${blogName}</a></p>

                            <button class="view-btn" onclick="getUsers()"><i class="fas fa-arrow-left back-arrow"></i> Back to users</button>
                        </div>
                    
                    </div>
                `

            /**
             * map() function - goes throw the array list each and every item in that array, for each item we are 
             * appending the div's which we have created using innerHTML
             */
            
            userRepos.map((repo)=>{

                const description = repo.description ? repo.description : 'no description'

                userRepoRow.innerHTML += `
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="single-repo" id=${repo.id}>
                                <h5><a href='${repo.html_url}' target="_blank">${repo.name}</a></h5>
                                <p>${despTruncate(description,100)}</p>
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


    }

    getUsers()
}

/**
 * function to truncate the description, when it exceeds the given limit
 * @param {string} string description is passed as the param here
 * @param {number} n limit is mentioned as arguement
 * @returns truncated string along with ... if it exceeds the limit, otherwise returns the original string
 */

const despTruncate = (string, n) => {
    return string?.length > n ? string.substr(0,n-1) + '...' : string
}