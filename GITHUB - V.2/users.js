const mainSection = document.createElement('section')
document.body.append(mainSection)

const mainDiv = document.createElement('div')
mainSection.append(mainDiv)
mainDiv.setAttribute('class','container-fluid')

const searchDiv = document.createElement('div')
searchDiv.setAttribute('class','row')
mainDiv.append(searchDiv)

const mainRow = document.createElement('div')
mainRow.setAttribute('class','row')
mainDiv.append(mainRow)

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

    try {
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

const searchUser = async(event) => {
    event.preventDefault()

    const enteredUser = document.getElementById('search').value
    console.log(enteredUser)

    getUserDetail(enteredUser)

    document.getElementById('search').value = ''
}

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

const despTruncate = (string, n) => {
    return string?.length > n ? string.substr(0,n-1) + '...' : string
}