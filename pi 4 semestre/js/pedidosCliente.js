// Recupera o usuário do sessionStorage
const user = JSON.parse(sessionStorage.getItem("user"));
const id_sair = document.getElementById("id_sair");



// Busca os dados do usuário e os endereços
fetchUserData();
findById(user.id);



// **Adicionar o evento de clique ao elemento "Meus Dados"**
document.querySelectorAll('.linkList').forEach(link => {
    if (link.textContent.trim() === "Meus Dados") {
        link.addEventListener("click", function () {
            window.location.href = "perfilUsuario.html"; // Redireciona para a página de perfil do usuário
        });
    }
});

id_sair.addEventListener("click", function () {
    window.location.href = "loginUsuario.html";
    sessionStorage.clear();
})

// Função que busca os dados do usuário
async function fetchUserData() {
    document.getElementById('nome_id').textContent = user.nome; // Ajuste a propriedade conforme seu retorno
    document.getElementById('email_id').textContent = user.email; // Ajuste a propriedade conforme seu retorno
}

// Função que busca os endereços do usuário
async function findById(userId) {
    const endpoint = `http://localhost:8080/pedidos/${userId}`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const dados = await response.json();
        displayData(dados);


    } catch (error) {
        console.error("Erro ao buscar endereços:", error);
        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Usuário não encontrado.",
            showConfirmButton: false,
            timer: 1500
        });
    }
}


// Função que busca o endereço do usuário
async function findAddressById(addressId) {
    const endpoint = `http://localhost:8080/endereco/${addressId}`;

    try {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const data = await response.json(); // Aguarda e processa o JSON
        const enderecoFormatado = `Bairro: ${data.bairro}, ${data.rua} Número: ${data.numero}`;

        return enderecoFormatado; // Retorna os dados formatados
    } catch (error) {
        console.error("Erro ao buscar endereço:", error.message);
        throw error; // Propaga o erro para tratamento externo
    }
}


function formatDate(dataNascimento) {
    var data = new Date(dataNascimento.split('.')[0]);

    // Extrair o ano, mês e dia
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
    const dia = String(data.getDate()).padStart(2, '0');

    var novaData = `${dia}/${mes}/${ano}`;
    return novaData;
}


// Função para exibir os endereços
function displayData(dados) {

    dados.forEach(function (dado) {

        let enderecoUser;
        var tbody = document.createElement("tbody");
        var rowTable = document.createElement("tr");
        var tdCodigo = document.createElement("td");
        var tdItens = document.createElement("td");
        var tdPreco = document.createElement("td");
        var tdMetodoPgto = document.createElement("td");
        var tdEndereco = document.createElement("td");
        var tdData = document.createElement("td");
        var tdStatus = document.createElement("td");
        var tdData = document.createElement("td");

        var buttonVisualize = document.createElement("button");


        buttonVisualize.classList.add("ativar");
        // var tdVisualizar = document.createElement("td");

        //MONTA O HTML DA LISTAGEM.
        // buttonActive.classList.add("ativar");
        // buttonDeactivate.classList.add("desativar");
        // buttonEditProduct.classList.add("edit");
        // buttonVisualize.classList.add("edit");


        idTable.appendChild(tbody);
        tbody.appendChild(rowTable);
        rowTable.appendChild(tdCodigo);
        rowTable.appendChild(tdItens);
        rowTable.appendChild(tdPreco);
        rowTable.appendChild(tdMetodoPgto);
        rowTable.appendChild(tdEndereco);
        rowTable.appendChild(tdData);
        rowTable.appendChild(tdStatus);
        rowTable.appendChild(buttonVisualize);


        // //SETA CADA CAMPO INDIVIDUALMENTE
        tdCodigo.innerHTML = dado.id;
        // buscaPorNome(dado.id).then(nome => { tdItens.innerHTML = nome });
        tdItens.innerHTML = dado.qtdItens;
        tdPreco.innerHTML = dado.valorCompra;
        tdMetodoPgto.innerHTML = dado.metodoPgto;

        switch (dado.status) {
            case "AGUARDANDOPGTO":
                tdStatus.innerHTML = "Aguardando Pagamento";
                break;
            case "PGTOREJEITADO":
                tdStatus.innerHTML = "Pagamento Rejeitado";
                break;
            case "PGTOAPROVADO":
                tdStatus.innerHTML = "Pagamento Aprovado";
                break;
            case "AGUARDANDORETIRADA":
                tdStatus.innerHTML = "Aguardando Retirada";
                break;
            case "EMTRANSITO":
                tdStatus.innerHTML = "Em trânsito";
                break;
            case "ENTREGUE":
                tdStatus.innerHTML = "Entregue!";
                break;
            default:
                break;
        }


        findAddressById(dado.enderecoId).then((endereco) => {
            tdEndereco.innerHTML = endereco
            enderecoUser = endereco;
        });


        buttonVisualize.onclick = function () {

            const pedido = {
                "client_id": dado.clientId,
                "data_compra": dado.dataCompra,
                "qtd_itens": dado.qtdItens,
                "valor_compra": dado.valorCompra,
                "endereco": enderecoUser,
                "metodoPgto": dado.metodoPgto,
                "statusCompra": dado.status,
                "produtos": dado.produtos
            }

            sessionStorage.setItem("orderVisu", JSON.stringify(pedido));

            sessionStorage.setItem("visualize", true);

            window.location.href = "visuPedido.html";
        }

        buttonVisualize.innerHTML = "Visualizar";
        tdData.innerHTML = formatDate(dado.dataCompra);

        // buttonVisualize.innerHTML = "Visualizar"
    });
}