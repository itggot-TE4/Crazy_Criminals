async function search(){
    let search = document.getElementById('searchBar').value;
    console.log(search);
    // let result = await getAPI(search);
    let result = await fetch(`https://api.github.com/users/${search}/repos`);
    // const text = await (handleData(result.json()));
    const text = await (result.json());
    console.log(text)
    handleData(text);
}

function handleData(repositories){
    for(let repo of repositories) {
        console.log(repo);
        createCard(repo);
    }
}

function createCard(repo){

    let parent = document.querySelector('#card');
    let card = parent.content.cloneNode(true);

    let APIname = card.querySelector('p.name');
    APIname.innerHTML = repo.name;

    let forks = card.querySelector('p.counter');
    forks.innerHTML = repo.forks;

    console.log(card);

    document.querySelector('.cardBox').appendChild(card)

}

function generateTemp(){
    let parent = document.querySelector('#card');
    let card = parent.content.cloneNode(true);
    console.log(card);
    document.querySelector(".cardBox").appendChild(card);
}