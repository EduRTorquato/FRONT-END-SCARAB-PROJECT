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

const btnSaveStatus = document.getElementById("btnSaveStatus");

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


        let enderecoUser;

        var tbody = document.createElement("tbody");
        var rowTable = document.createElement("tr");
        var tdCodigo = document.createElement("th");
        var tdNome = document.createElement("td");
        var tdQuantidade = document.createElement("td");
        var tdValor = document.createElement("td");
        var tdMetodoPgto = document.createElement("td");
        var tdStatus = document.createElement("td");
        var tdAlterar = document.createElement("td");
        var tdVisualizar = document.createElement("td");

        var buttonChangeStatus = document.createElement("button");
        var buttonVisualize = document.createElement("button");



        buttonChangeStatus.onclick = function () {


            modalProduct.show();
            nomeProduto.value = buscaPorNome(dado.clientId).then(nome => { nomeProduto.value = nome});
            preco.value = dado.valorCompra;
            dataCompra.value = formatDate(dado.dataCompra);

            btnSaveStatus.addEventListener("click", function () {

                alteraStatus(dado.id, statusPedido.value);

            })

            // statusPedido.value = "Em preparação";
        }

        findAddressById(dado.enderecoId).then((endereco) => {
            // tdEndereco.innerHTML = endereco
            enderecoUser = endereco;
        });



        //MONTA O HTML DA LISTAGEM.
        buttonChangeStatus.classList.add("ativar");
        buttonVisualize.classList.add("edit");


        idTable.appendChild(tbody);
        tbody.appendChild(rowTable);
        rowTable.appendChild(tdCodigo);
        rowTable.appendChild(tdNome);
        rowTable.appendChild(tdQuantidade);
        rowTable.appendChild(tdValor);
        rowTable.appendChild(tdMetodoPgto);
        rowTable.appendChild(tdStatus);


        rowTable.appendChild(tdAlterar);
        rowTable.appendChild(tdVisualizar);

        tdAlterar.appendChild(buttonChangeStatus);
        tdVisualizar.appendChild(buttonVisualize);


        // //SETA CADA CAMPO INDIVIDUALMENTE
        tdCodigo.innerHTML = dado.id;
        buscaPorNome(dado.clientId).then(nome => { tdNome.innerHTML = nome });
        tdQuantidade.innerHTML = dado.qtdItens;
        tdValor.innerHTML = dado.valorCompra;
        tdMetodoPgto.innerHTML = dado.metodoPgto;
        tdStatus.innerHTML = dado.status;

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

        buttonVisualize.innerHTML = "Visualizar"
        buttonChangeStatus.innerHTML = "Alterar"

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

            sessionStorage.setItem("estoquista", true);

            window.location.href = "visuPedido.html";
        }


    });
}

async function alteraStatus(id, status) {

    // CHAMA O ENDPOINT DE PUT
    await fetch(`http://localhost:8080/pedidos/${id}/${status}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },

    }).then(response => {
        if (response.status != 200) {
            throw new Error("Verifique os dados");
        } else {

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Status alterado com sucesso",
                showConfirmButton: false,
                timer: 1500
            });

            setTimeout(function () {
                location.reload();
            }, 2000);

        }
        return response.text();
    });
}

async function buscaPorNome(id) {
    const endpointMontado = `http://localhost:8080/cliente/${id}`;

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