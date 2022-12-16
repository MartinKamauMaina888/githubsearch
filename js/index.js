function searchUser(e){
    e.preventDefault()
    let newUser={
        search: e.target.search.value
    }

    queryUser(newUser)
}

function queryUser(data){
    fetch(`https://api.github.com/users/${data.search}`,{
        method: 'GET',
        headers: {
            'Accept': 'application / vnd.github.v3 + json'
        },
     
    }).then(response => response.json()).then(data => showUsers(data))

}

function showUsers(user){
    const li=document.createElement('li')
    li.className='card'
    li.innerHTML=`
        <div class="card-header">
        <img id="user_image" src="${user.avatar_url}">
        </div>
        <div class="card-body">
        <h3>Username: ${user.login}</h3>
        <hr>
        <h5>Followers: ${user.followers}</h5>
        <hr>
        <h5>Following: ${user.following}</h5>
        <hr>
        <p>Joined on: ${user.created_at}</p>
        <hr>
        <button class="btn-sm btn btn-success" id="user_repos">Repos</button>
        </div>
    `
    li.querySelector('#user_repos').addEventListener('click', () => {
        const url = user.repos_url
        userRepos(url)
    })

    document.querySelector('#user-list').appendChild(li)

}

function userRepos(url){
    fetch(url).then(response=>response.json()).then(data=>data.forEach(repos=>allRepos(repos)))
}

function allRepos(repos) {
    console.log(repos);
    const li = document.createElement('li')
    li.className = 'card'
    li.innerHTML = `
        <div class="card-body">
        <h5>Name:<a id="repo_name" href="${repos.html_url}">${repos.name}</a> </h5>
        </div>
    `
    document.querySelector('#repos-list').appendChild(li)

}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('#github-form').addEventListener('submit', searchUser)
   
})