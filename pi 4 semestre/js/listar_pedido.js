chamar();


const nomeProduto = document.getElementById("nomeProduto");
const preco = document.getElementById("preco");
const quantidadeEstoque = document.getElementById("quantidadeEstoque");
const descricaoProduto = document.getElementById("descricaoProduto");
const dataCompra = document.getElementById("dataCompra");
const btnSalvar = document.getElementById("btnSalvar");
const nomeBusca = document.getElementById("nomeBusca");
const imgSelect = document.getElementById("imgSelect");
const btnImagens = document.getElementById("btnImagens");
const buttonSelectFotos = document.getElementById("buttonSelectFotos");
const realizaBusca = document.getElementById("realizaBusca");
const idTable = document.getElementById("idTable");
const statusPedido = document.getElementById("statusPedido");

const checkboxLabel = document.getElementById("checkboxLabel");
/// MODAIS ///
const modalProduct = new bootstrap.Modal(document.getElementById('modalProduct'));
// const modalFotos = new bootstrap.Modal(document.getElementById('modalFotos'));
/// MODAIS ///

//BUSCAR PEDIDOS NO BACK
async function chamar() {
    // Chamar a API para carregar os pedidos
    await fetch("http://localhost:8080/pedidos").then(response => {
        if (response.ok) {

        }
        return response.json();
    }).then((data) => {
        criarPedidos(data);


    }).catch((error) => {
        console.error(error);
    });
}



// MONTA TABELAS COM PRODUTOS
async function criarPedidos(dados) {


    dados.forEach(function (dado) {



        var tbody = document.createElement("tbody");
        var rowTable = document.createElement("tr");
        var tdCodigo = document.createElement("th");
        var tdNome = document.createElement("td");
        var tdQuantidade = document.createElement("td");
        var tdValor = document.createElement("td");
        var tdStatus = document.createElement("td");
        var tdVisualizar = document.createElement("td");


        var buttonEditProduct = document.createElement("button");
        var buttonActive = document.createElement("button");
        var buttonDeactivate = document.createElement("button");
        var buttonVisualize = document.createElement("button");

        buttonVisualize.onclick = function () {
            console.log("Deve abrir um modal com detalhes do pedidos");
            modalProduct.show();
            nomeProduto.value = buscaPorNome(dado.id).then(nome => { nomeProduto.value = nome });
            preco.value = dado.valorCompra;
            dataCompra.value = formatDate(dado.dataCompra)
            statusPedido.value = "Em preparação";
        }

        //MONTA O HTML DA LISTAGEM.
        buttonActive.classList.add("ativar");
        buttonDeactivate.classList.add("desativar");
        buttonEditProduct.classList.add("edit");
        buttonVisualize.classList.add("edit");


        idTable.appendChild(tbody);
        tbody.appendChild(rowTable);
        rowTable.appendChild(tdCodigo);
        rowTable.appendChild(tdNome);
        rowTable.appendChild(tdQuantidade);
        rowTable.appendChild(tdValor);
        rowTable.appendChild(tdStatus);


        //Botão Visualizar
        rowTable.appendChild(tdVisualizar);
        tdVisualizar.appendChild(buttonVisualize);

        // //SETA CADA CAMPO INDIVIDUALMENTE
        tdCodigo.innerHTML = dado.id;
        buscaPorNome(dado.clientId).then(nome => { tdNome.innerHTML = nome });
        tdQuantidade.innerHTML = dado.qtdItens;
        tdValor.innerHTML = dado.valorCompra;
        tdStatus.innerHTML = dado.metodoPgto;

        buttonVisualize.innerHTML = "Visualizar"

        console.log(dado);

        console.log(formatDate(dado.dataCompra));


    });
}


async function buscaPorNome(id) {
    const endpointMontado = `http://localhost:8080/cliente/${10}`;

    try {
        const response = await fetch(endpointMontado);

        // Verifica se a resposta é OK
        if (response.ok) {
            const dado = await response.json();  // Converte a resposta para JSON
            return dado.nome;  // Retorna o nome do cliente
        } else {
            throw new Error('Erro ao buscar dados');
        }
    } catch (error) {
        console.error(error);
        return null;  // Retorna null em caso de erro
    }
}


function formatDate(dataNascimento) {
    var data = new Date(dataNascimento.split('.')[0]);

    // Extrair o ano, mês e dia
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
    const dia = String(data.getDate()).padStart(2, '0');

    var novaData = `${ano}-${mes}-${dia}`;
    return novaData;
}
