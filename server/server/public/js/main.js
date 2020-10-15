function sum (a, b) { return a + b }
module.exports = sum

function run(){
    window.document.querySelector('#searchButton').addEventListener('click', search)
}

async function search () { // eslint-disable-line no-unused-vars
  const search = document.getElementById('searchBar').value
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

  const APIname = card.querySelector('p.name')
  APIname.innerHTML = repo.name

  const forks = card.querySelector('p.counter')
  forks.innerHTML = repo.forks

  console.log(card)

  document.querySelector('.cardBox').appendChild(card)
}

function generateTemp () { // eslint-disable-line no-unused-vars
  const parent = document.querySelector('#card')
  const card = parent.content.cloneNode(true)
  console.log(card)
  document.querySelector('.cardBox').appendChild(card)
}

run()