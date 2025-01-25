const fs = require("fs");
const DATA_FILE = "data.json";

const readData = () => {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
};

// Função para salvar os dados no arquivo JSON
const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};
module.exports = {
    readData,
    writeData
}