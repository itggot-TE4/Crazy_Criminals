function run () {
  window.document.querySelector('#searchButton').addEventListener('click', search)
  const url = window.location.pathname.split('/')
  console.log(url)
  if (url[1] === 'user') {
    getForks(url[2], url[3])
  }
}

 async function getForks (user, reponame) { // eslint-disable-line no-unused-vars
  const result = await fetch(`https://api.github.com/repos/${user}/${reponame}/forks`)
  const hej = await result.json()
  handleForkData(hej)
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

async function search (e) { // eslint-disable-line no-unused-vars
  e.preventDefault();
  const search = document.getElementById('search').value
  console.log(search)
  // let result = await getAPI(search);
  const result = await fetch(`https://api.github.com/users/${search}/repos`)
  // const text = await (handleData(result.json()));
  const text = await (result.json())
  console.log(text)
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

  const APIname = card.querySelector('h6')
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


document.querySelector('#searchButton').addEventListener('click', head)


function head(){
  
  document.querySelector('.textBox').innerHTML = '';
  document.querySelector('.textBox').style.width = '0px'; 
}

run()
