const mainSection = document.createElement('section')
document.body.append(mainSection)

const mainDiv = document.createElement('div')
mainSection.append(mainDiv)
mainDiv.setAttribute('class','container-fluid')

const mainRow = document.createElement('div')
mainRow.setAttribute('class','row')
mainDiv.append(mainRow)

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
            
            userRepos.map((repo)=>{
                // console.log(repo.name, repo.html_url, repo.stargazers_count, repo.forks_count)

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