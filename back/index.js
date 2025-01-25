const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 3000;
const { readData, writeData } = require("./dados.js");
const { OrganizarData } = require("./data-jogos.js");

//Formata de data
// {
//     "id": 0,
//     "nome": "",
//     "image": "",
//     "descricao": "",
//     "atualizacao": "",
//     "reputacao": "",
//     "imagensComplementares": "",
//     "plataforams": "",
//     "avaliacoes": ""
// }


app.use(cors())
// Middleware para processar JSON no body das requisições
app.use(bodyParser.json());

// Função para ler os dados do arquivo JSON

// Rota: Obter todos os registros
app.get("/games", (req, res) => {
    const data = readData();
    res.json(data);
});
app.get("/games-per-category", (req, res) => {
    const { category } = req.query;
    const data = readData();
    let dataRetornar = data.filter(x => x.generos.includes(category))
    console.log(dataRetornar)
    res.json(dataRetornar);
});
app.get("/games-hot", (req, res) => {
    const data = readData();
    let jogosRetornar = []
    let jogos = 0
    while (jogos < 9) {
        const aleatorio = Math.floor(Math.random() * data.length);
        const jogo = data[aleatorio];
        if (!jogosRetornar.includes(jogo)) {
            jogosRetornar.push(jogo)
            jogos++
        }
    }
    res.json(jogosRetornar);
});
// Rota: Criar um novo registro
app.post("/game", (req, res) => {
    const data = readData();
    const newItem = { id: Date.now(), ...req.body }; // Gera um ID único
    data.push(newItem);
    writeData(data);
    res.status(201).json(newItem);
});

// Rota: Atualizar um registro por ID
app.param("/game/:id", (req, res) => {
    const data = readData();
    const { id } = req.params;
    const index = data.findIndex((item) => item.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ error: "Item não encontrado" });
    }

    data[index] = { ...data[index], ...req.body };
    writeData(data);
    res.json(data[index]);
});

// Rota: Deletar um registro por ID
app.delete("/game/:id", (req, res) => {
    const data = readData();
    const { id } = req.params;
    const newData = data.filter((item) => item.id !== parseInt(id));

    if (data.length === newData.length) {
        return res.status(404).json({ error: "Item não encontrado" });
    }

    writeData(newData);
    res.status(204).send(); // No content
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    // console.log("Organizando dados...");
    // OrganizarData()
});
