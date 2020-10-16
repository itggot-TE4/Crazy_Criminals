function run () {
  window.document.querySelector('#searchButton').addEventListener('click', search)
  const url = window.location.pathname.split('/')
  console.log(url)
  if (url[1] === 'user') {
    getForks(url[2], url[3])
  }
}

 async function getForks (user, reponame) { // eslint-disable-line no-unused-vars
  const result = await fetch(`/forks/${user}/${reponame}`, {method: 'POST'})
  const hej = await result.json()
//   console.log(JSON.p;
  handleForkData(hej);
}

function handleForkData (forkData) {
  for (const data of forkData) {
    createForkCard(data)
  }
}

function createForkCard (fork) {
  const parent = document.querySelector('#forkCard')
  const card = parent.content.cloneNode(true)

  card.querySelector('.reponame').innerHTML = fork.full_name
  card.querySelector('.ghlink').href = fork.html_url

  document.querySelector('.repoviewContainer').appendChild(card)
}

async function search () { // eslint-disable-line no-unused-vars
  const search = document.getElementById('searchBar').value
//   console.log(search)
  // let result = await getAPI(search);
//   const result = await fetch(`https://api.github.com/users/${search}/repos`)
  const result = await fetch(`/search/${search}`, {method: 'GET'})
  // const text = await (handleData(result.json()));
  const text = await result.json()
  handleData(text)
}

function handleData (repositories) {
  for (const repo of repositories) {
    console.log(repo)
    createCard(repo)
  }
}

function createCard (repo) {
  const parent = document.querySelector('#card')
  const card = parent.content.cloneNode(true)

  const APIname = card.querySelector('p.name')
  APIname.innerHTML = repo.name

  const forks = card.querySelector('p.counter')
  forks.innerHTML = repo.forks

  const gh = card.querySelector('#ghlink')
  gh.href = repo.html_url

  const forklink = card.querySelector('.forkLink')
  forklink.href = `/user/${repo.full_name}`

  document.querySelector('.cardBox').appendChild(card)
}

function generateTemp () { // eslint-disable-line no-unused-vars
  const parent = document.querySelector('#card')
  const card = parent.content.cloneNode(true)
  console.log(card)
  document.querySelector('.cardBox').appendChild(card)
}


run()
