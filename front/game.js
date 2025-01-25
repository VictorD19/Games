const montarGamesLateral = () => {
    const tagLateral = document.getElementById('card_box_game_rigth_games');
    ObterjogosHot().then((games) => {
        debugger;
        for (let i = 0; i < games.length; i++) {
            const jogo = games[i];
            let div = document.createElement("div")
            div.classList.add("card-game-single")
            div.innerHTML = `
            <div class="img"><img width="130" src="${jogo.image}" alt="game"></div>
            <div class="truncate">${jogo.nome}</div>
            `
            tagLateral.appendChild(div)
        }
    }
    )
}
montarGamesLateral()