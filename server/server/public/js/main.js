async function getForks() {
    let user = "itggot";
    let reponame = "apl-preparation";
    let result = await fetch(`https://api.github.com/repos/${user}/${reponame}/forks`);
    const hej = await result.json();
    console.log(hej);
    handleForkData(hej);
    // handleRepoData(hej);
}

function handleForkData(forkData) {
    for(i = 0; i < forkData.length; i++) {
        createForkCard(forkData[i]);
    }
}

function createForkCard(fork) {
    let parent = document.querySelector("#forkCard");
    let card = parent.content.cloneNode(true);

    card.querySelector(".reponame").innerHTML = fork.full_name;
    card.querySelector(".ghlink").href = fork.html_url;

    document.querySelector('.repoviewContainer').appendChild(card);
}