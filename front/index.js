const baseURL = 'http://localhost:3000'
const Obterjogos = () => {
    return fetch(baseURL + '/jogos')
        .then((resposta) => {
            return resposta.json()
        })
}

const ObterjogosHot = () => {
    return fetch(baseURL + '/games-hot')
        .then((resposta) => {
            return resposta.json()
        })
}
const ObterJogosPorCategoria = (categoria) => {
    return fetch(baseURL + '/games-per-category?category=' + categoria)
        .then((resposta) => {
            return resposta.json()
        })
}