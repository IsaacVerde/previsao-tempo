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
let images = [];
let currentIndex = 0;

async function fetchImages() {
    try {
        const response = await fetch(`https://api.unsplash.com/collections/${collectionId}/photos?client_id=${accessKey}&per_page=10&orientation=landscape`);
        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        images = data.map(img => img.urls.full);
        console.log('Images fetched:', images);
    } catch (error) {
        console.error(error);
        images = []; // Reseta imagens em caso de erro
    }
}

async function updateBackground() {
    if (images.length === 0) {
        await fetchImages();
    }
    if (images.length > 0) {
        background.style.backgroundImage = `url(${images[currentIndex]})`;
        console.log('Background updated:', images[currentIndex]);
        currentIndex = (currentIndex + 1) % images.length;
    }
}

setInterval(updateBackground, 10000); // Altere o intervalo conforme necessário
updateBackground();
