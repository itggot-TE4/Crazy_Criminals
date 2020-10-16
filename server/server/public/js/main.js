function run () {
  window.document.querySelector('#searchButton').addEventListener('click', search)
  const url = window.location.pathname.split('/')
  console.log(url)
  if (url[1] === 'user') {
    getForks(url[2], url[3])
  }
}

async function getForks (user, reponame) { // eslint-disable-line no-unused-vars
  const result = await fetch(`/forks/${user}/${reponame}`, { method: 'POST' })
  const hej = await result.json()
  //   console.log(JSON.p;
  handleForkData(hej)
}

function handleForkData (forkData) {
  for (const data of forkData) {
    createForkCard(data)
  }
}

async function getSource (data, codeParent) {
  const result = await fetch(`/manifest/${data.fullname}`, {method: 'POST'})
  const manifest = await result.json()

  console.log('MANIFEST')
  console.log(manifest)

  const unparsed = atob(manifest.content)
  const filePath = JSON.parse(unparsed)


  // https://api.github.com/repos/${data.full_name}/contents/${filePath.filePath}
  const sourceLoad = await fetch(`/content/${data.full_name}/${filePath.filePath}`, {method: 'POST'})
  const sourceCode = await sourceLoad.json()
  const code = atob(sourceCode.content)
  codeParent.innerHTML = code
}

function createForkCard (fork) {
  const parent = document.querySelector('#forkCard')
  const card = parent.content.cloneNode(true)

  card.querySelector('.reponame').innerHTML = fork.full_name
  card.querySelector('.ghlink').href = fork.html_url
  getSource(fork, card.querySelector('.code'))

  document.querySelector('.repoviewContainer').appendChild(card)
}

async function search () { // eslint-disable-line no-unused-vars
  const search = document.getElementById('searchBar').value
  const result = await fetch(`/search/${search}`, { method: 'GET' })
  const text = await result.json()
  console.log(text)
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
