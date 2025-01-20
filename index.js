const API_KEY = "f7bc3436e62241779fc6df350e28371b"
const BASE_URL = "https://api.rawg.io/api/"
const PLATAFORMAS = {
    Android: 21,
    PC: 4,
    IOS: 2,
}

const GENEROS = {
    RPG: 5,
    Racing: 1,
    Puzzle: 7,
    Adventure: 3,
    Simulation: 14,
    Casual: 40
}

const RealizarRequest = async (endpoint, parametros) => {
    try {
        let urlConsultar = BASE_URL + endpoint + `?key=${API_KEY}`
        if (parametros)
            urlConsultar += parametros
        const reponse = await fetch(urlConsultar)
        return [await reponse.json(), null]
    } catch (error) {
        return [null, error.message]
    }
}

const API = {
    ConsultarJogos: async () => await RealizarRequest("games", `&ordering=-rating&genres=5,1,7,3,14,40&platforms=${PLATAFORMAS.Android},${PLATAFORMAS.IOS}`),
    ConsultarDetalhesJogo: async (id) => await RealizarRequest("games/" + id)
}

const OrganizarData = async () => {
    const [data, erro] = await API.ConsultarJogos()

    if (erro)
        return console.log(erro)

    const jogosTratados = await PadronizarJogos(data.results)

    console.log(jogosTratados)
}

const PadronizarJogos = async (lista) => {
    let listaRetorno = []
    for (let i = 0; i < lista.length; i++) {
        const { name, platforms, background_image, rating, id, short_screenshots } = lista[i];
        const [detalhesJogo, erro] = await API.ConsultarDetalhesJogo(id)
        const plataforams = platforms.map(x => x.platform.name).join(", ")
        const imagenes = short_screenshots.map(x => x.image)
        let jogo = {
            nome: name,
            image: background_image,
            descricao: detalhesJogo.description,
            atualizacao: detalhesJogo.updated,
            reputacao: rating,
            imagensComplementares: imagenes,
            plataforams: plataforams,
            avaliacoes: Math.floor(Math.random() * 100)
        }
        listaRetorno.push(jogo);
        break
    }
    return listaRetorno
}

 OrganizarData()