const params = new URLSearchParams(window.location.search);

const category = params.get("category"); // Ex: "?category=books"
const montarGamesCategoria = () => {
    let tagGame = document.getElementById("box_grid-games")
    ObterJogosPorCategoria(category).then((data) => {
        data.forEach(jogo => {
            let div = document.createElement("div")
      
            div.innerHTML = `
            <div class="card-game-single">
            <div class="img"><img width="130" src="${jogo.image}" alt="game"></div>
            <div class="truncate">${jogo.nome}</div></div>
            `
            tagGame.appendChild(div)
        })
    })
}
montarGamesCategoria()