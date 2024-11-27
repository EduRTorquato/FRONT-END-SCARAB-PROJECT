
// Recupera o usuário do sessionStorage
const user = JSON.parse(sessionStorage.getItem("user"));
const estoquista = JSON.parse(sessionStorage.getItem("estoquista"));
const orderVisu = JSON.parse(sessionStorage.getItem("orderVisu"));

let products = [];
products = orderVisu.produtos;

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
    const cartList = document.getElementById('listCarrinho');

    cartList.innerHTML = '';




    products.forEach(product => {

        const rowProduct = document.createElement("div");
        const itemLine = document.createElement("div");
        const imgProduct = document.createElement("img");
        const colNome = document.createElement("div");
        const nomeProduct = document.createElement("h5");
        const valueName = document.createElement("p");
     

        const colQuantidade = document.createElement("div");
        const titleQtd = document.createElement("h5");
        const qtd = document.createElement("p");
        const divValue = document.createElement("div");
        const valueTitle = document.createElement("h5");
        const price = document.createElement("p");

        rowProduct.classList.add("row");
        itemLine.classList.add("item");

        colNome.classList.add("col");
        colQuantidade.classList.add("col");
        colQuantidade.classList.add("quantidade");

        cartList.appendChild(rowProduct);
        rowProduct.appendChild(itemLine);
        itemLine.appendChild(imgProduct);

        itemLine.appendChild(colNome);
        colNome.appendChild(nomeProduct);
        colNome.appendChild(valueName);

        itemLine.appendChild(colQuantidade);
        colQuantidade.appendChild(titleQtd);
        colQuantidade.appendChild(qtd);

        itemLine.appendChild(divValue);
        divValue.appendChild(valueTitle);
        divValue.appendChild(price);


        //Definindo Quantidade
        titleQtd.innerHTML = "Quantidade"
        qtd.innerHTML = product.qty;

        //Definindo coluna nome
        nomeProduct.innerHTML = "Produto";
        valueName.innerHTML = product.nomeProduto;

        imgProduct.src = product.foto;
        
        //Valor unitário do produto
        valueTitle.innerHTML = "Valor";
        price.innerHTML = "R$" + product.preco;


    });

    // itensId.innerHTML = "Produtos Comprados: " + orderVisu.qtd_itens;
    enderecoId.innerHTML = orderVisu.endereco;
    inputState.value = orderVisu.metodoPgto;
    valorTotalCompra.innerHTML = "R$ " + orderVisu.valor_compra + ",00";
    dataId.innerHTML = formatDate(orderVisu.data_compra);

    switch (orderVisu.statusCompra) {
        case "AGUARDANDOPGTO":
            statusId.innerHTML = "Aguardando Pagamento";
            break;
        case "PGTOREJEITADO":
            statusId.innerHTML = "Pagamento Rejeitado";
            break;
        case "PGTOAPROVADO":
            statusId.innerHTML = "Pagamento Aprovado";
            break;
        case "AGUARDANDORETIRADA":
            statusId.innerHTML = "Aguardando Retirada";
            break;
        case "EMTRANSITO":
            statusId.innerHTML = "Em trânsito";
            break;
        case "ENTREGUE":
            statusId.innerHTML = "Entregue!";
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