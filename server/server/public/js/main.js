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

async function get_source(data,card){
  console.log(data)
  const result = await fetch(`https://api.github.com/repos/${data.full_name}/contents/.manifest.json`)
  const manifest = await result.json()
  const unparsed = atob(manifest.content);
  const file_path = JSON.parse(unparsed)

  const source_load = await fetch(`https://api.github.com/repos/${data.full_name}/contents/${file_path.filePath}`)
  const source_code = await source_load.json()
  const code = atob(source_code.content)
  console.log(code)
  // console.log(card.querySelector('.code'))
  card.querySelector('.code').innerHTML = code;
}

function createForkCard (fork) {
  const parent = document.querySelector('#forkCard')
  const card = parent.content.cloneNode(true)
  
  card.querySelector('.reponame').innerHTML = fork.full_name
  card.querySelector('.ghlink').href = fork.html_url
  get_source(fork,card)
  
  document.querySelector('.repoviewContainer').appendChild(card)
}

async function search () { // eslint-disable-line no-unused-vars
  const search = document.getElementById('searchBar').value
  console.log(search)
  // let result = await getAPI(search);
  const result = await fetch(`https://api.github.com/users/${search}/repos`)
  // const text = await (handleData(result.json()));
  const text = await (result.json())
  handleData(text)
}

function handleData (repositories) {
  for (const repo of repositories) {
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
