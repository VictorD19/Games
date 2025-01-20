const API_KEY = "f7bc3436e62241779fc6df350e28371b"
const BASE_URL = "https://api.rawg.io/api/"
const PLATAFORMAS = {
    Android: 21,
    PC: 4,
    IOS: 2,
}
const RealizarRequest = async (endpoint, parametros) => {
    try {
        let urlConsultar = BASE_URL + endpoint + `?key=${API_KEY}`
        if (parametros)
            urlConsultar += parametros
        const reponse = await fetch()
        return [reponse.json(), null]
    } catch (error) {
        return [null, error.message]
    }
}
const API = {
    ConsultarJogos: async () => await RealizarRequest("games", `&ordering=-rating&genres=5,1,7,3,14,40&platforms=${PLATAFORMAS.Android},${PLATAFORMAS.IOS}`),
    ConsultarDetalhesJogo: async (id) => await RealizarRequest("games/" + id)
}