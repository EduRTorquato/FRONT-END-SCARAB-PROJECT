$('#preco').mask('000.000.000.000.000,00', { reverse: true });
chamar();
criarPastaArquivos();


const nomeProduto = document.getElementById("nomeProduto");
const preco = document.getElementById("preco");
const quantidadeEstoque = document.getElementById("quantidadeEstoque");
const inputFile = document.getElementById("inputFile");
const descricaoProduto = document.getElementById("descricaoProduto");

const btnSalvar = document.getElementById("btnSalvar");



async function chamar() {
    // Chamar a API para carregar os usuários
    await fetch("http://localhost:8080/produtos").then(response => {
        if (response.ok) {

        }
        return response.json();
    }).then((data) => {

        console.log(data);
        //criarUsers(data);

    }).catch((error) => {
        console.error(error);
    });
}

btnSalvar.addEventListener("click", function () {
    const objProduto = {
        "nomeProduto": nomeProduto.value,
        "preco": preco.value,
        "quantidadeEstoque": quantidadeEstoque.value,
        "img": inputFile.value,
        "descricaoProduto": descricaoProduto.value
    }

    console.log(objProduto);

})


async function criarPastaArquivos() {
    const fs = require('fs');

    // Defina o caminho da nova pasta
    const folderPath = './novaPasta';

    // Verifique se a pasta já existe e crie-a se necessário
    fs.access(folderPath, (error) => {
        if (error) {
            fs.mkdir(folderPath, (err) => {
                if (err) {
                    console.error('Erro ao criar a pasta:', err);
                } else {
                    console.log('Pasta criada com sucesso!');
                }
            });
        } else {
            console.log('A pasta já existe.');
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {

    const btnListarProduto = document.getElementById('btnListarProduto');
    const btnListarUsuario = document.getElementById('btnListarUsuario');
    const btnListarPedidos = document.getElementById('btnListarPedidos');

    function redirectToIndex(event) {
        event.preventDefault();
        window.location.href = '../html/lista_produto.html'; // Redireciona para index.html
    }
});
