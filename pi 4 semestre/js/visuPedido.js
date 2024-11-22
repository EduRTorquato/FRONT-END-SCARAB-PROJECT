
// Recupera o usuário do sessionStorage
const user = JSON.parse(sessionStorage.getItem("user"));
const estoquista = JSON.parse(sessionStorage.getItem("estoquista"));
const orderVisu = JSON.parse(sessionStorage.getItem("orderVisu"));


//Componente de endereços
const enderecoId = document.getElementById("enderecoId");

//Coleta dados do pedido
const dadosPedido = JSON.parse(sessionStorage.getItem("order"));

//Valor total da compra
const valorTotalCompra = document.getElementById("valorTotalCompra");
const btnFinsh = document.getElementById("btnFinsh");
const inputState = document.getElementById("inputState");
const dataId = document.getElementById("dataId");
const statusId = document.getElementById("statusId");
const itensId = document.getElementById("itensId");
const btnVoltar = document.getElementById("btnVoltar");



// Exibe os itens no carrinho ao carregar a página
displayOrders();

// Exibe os itens no carrinho
function displayOrders() {

    //SETA VALORES IMPORTANTES DO RESUMO

    itensId.innerHTML = "Produtos Comprados: " + orderVisu.qtd_itens;
    enderecoId.innerHTML = orderVisu.endereco;
    inputState.value = orderVisu.metodoPgto;
    valorTotalCompra.innerHTML = "R$ " + orderVisu.valor_compra + ",00";
    statusId.innerHTML = orderVisu.statusCompra;
    dataId.innerHTML = formatDate(orderVisu.data_compra);

    switch (orderVisu.statusCompra) {
        case "PREPARACAO":
            statusId.innerHTML = "Preparação";
            break;
        case "ENVIADO":
            statusId.innerHTML = "Enviado";
            break;
        case "AGUARDANDOPGTO":
            statusId.innerHTML = "Aguardando Pagamento";
            break;
        case "FINALIZADO":
            statusId.innerHTML = "Finalizado";
            break;
        default:
            break;
    }


}


// Função que busca o endereço do usuário
async function findAddressById(addressId) {
    const endpoint = `http://localhost:8080/endereco/${addressId}`;

    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const dados = await response.json();
    const enderecoMontado = "Bairro: " + dados.bairro + ", " + dados.rua + " Número: " + dados.numero;
    enderecoId.textContent = enderecoMontado;
}

btnVoltar.addEventListener("click", function () {
    if (!estoquista) {
        sessionStorage.removeItem('orderVisu');
        window.location.href = "pedidosCliente.html";
    }else{
        sessionStorage.removeItem('estoquista');
        window.location.href = "listar_pedido.html";
    }
})


function formatDate(dataNascimento) {
    var data = new Date(dataNascimento.split('.')[0]);

    // Extrair o ano, mês e dia
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
    const dia = String(data.getDate()).padStart(2, '0');

    var novaData = `${dia}/${mes}/${ano}`;
    return novaData;
}