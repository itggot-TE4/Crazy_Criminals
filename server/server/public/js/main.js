function run () {
  window.document.querySelector('#searchButton').addEventListener('click', search)

  const url = window.location.pathname.split('/')
  if (url[1] === 'user') {
    getForks(url[2], url[3])
  }
}

async function getForks (user, reponame) { // eslint-disable-line no-unused-vars
  const result = await fetch(`/forks/${user}/${reponame}`, { method: 'GET' })
  const hej = await result.json()
  console.log(hej)
  handleForkData(hej)
}

function handleForkData (forkData) {
  for (const data of forkData) {
    createForkCard(data)
  }
}

async function getSource (data, codeParent) {
  // console.log(data)
  const result = await fetch('/manifest', {
    method: 'POST',
    body: JSON.stringify({ fullname: data.full_name })
  })

  const manifest = await result.json()
  const unparsed = atob(manifest.content)
  const filePath = JSON.parse(unparsed)

  const sourceLoad = await fetch('/filecontent', {
    method: 'POST',
    body: JSON.stringify({ fullname: data.full_name, filePath: filePath.filePath })
  })

  const sourceCode = await sourceLoad.json()

  if (sourceCode.content !== undefined) {
    codeParent.innerHTML = atob(sourceCode.content)
  } else {
    codeParent.innerHTML = 'No code here...'
  }
}

function createForkCard (fork) {
  const parent = document.querySelector('#forkCard')
  const card = parent.content.cloneNode(true)

  card.querySelector('.reponame').innerHTML = fork.full_name
  card.querySelector('.ghlink').href = fork.html_url
  getSource(fork, card.querySelector('code.javascript'))

  document.querySelector('.repoviewContainer').appendChild(card)
  /* eslint-disable no-undef */

  hljs.initHighlightingOnLoad()

  /* eslint-enable no-undef */
}

async function search (e) { // eslint-disable-line no-unused-vars
  e.preventDefault()
  const search = document.getElementById('search').value
  const result = await fetch(`/search/${search}`, { method: 'GET' })
  const text = await result.json()
  console.log(text)
  deleteOld()
  handleData(text)
}

function handleData (repositories) {
  for (const repo of repositories) {
    createCard(repo)
  }
}
function deleteOld () {
  const oldElements = document.querySelectorAll('.card')
  for (const element of oldElements) {
    element.remove()
  }
}

function createCard (repo) {
  const parent = document.querySelector('#card')
  const card = parent.content.cloneNode(true)

  const APIname = card.querySelector('span')
  APIname.innerHTML = repo.name

  const forks = card.querySelector('span.right')
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

function head () {
  document.querySelector('.textBox').innerHTML = ''
  document.querySelector('.textBox').style.width = '0px'
}

run()
