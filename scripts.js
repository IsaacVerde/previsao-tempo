const key = "c69487dac761f17662904b0d0ad0d571";

function colocarDadosNaTela(dados) {
    console.log(dados);
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "ºC";
    document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description;
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%";
    document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
}

async function buscarCidade(cidade) {
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`)
        .then(resposta => resposta.json());
    colocarDadosNaTela(dados);
}

function cliqueiNoBotao() {
    const cidade = document.querySelector(".input-cidade").value;
    buscarCidade(cidade);
}

const accessKey = 'dMnTThOLPCS1G_lbNhyAFO0tsx5WCtle5eCBlFDUabU'; // Substitua pela sua chave de API do Unsplash
const collectionId = '431862'; // ID da coleção do Unsplash
const background = document.getElementById('background');

async function fetchImage() {
    const response = await fetch(`https://api.unsplash.com/collections/${collectionId}/photos?client_id=${accessKey}&per_page=1&orientation=landscape`);
    const data = await response.json();
    return data[0].urls.full;
}

async function updateBackground() {
    const imageUrl = await fetchImage();
    background.style.backgroundImage = `url(${imageUrl})`;
}

setInterval(updateBackground, 5000); // Altere o intervalo conforme necessário
updateBackground();
