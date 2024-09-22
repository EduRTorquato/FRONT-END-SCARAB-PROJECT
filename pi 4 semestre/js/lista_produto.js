$('#preco').mask('000.000.000.000.000,00', { reverse: true });
chamar();



const nomeProduto = document.getElementById("nomeProduto");
const preco = document.getElementById("preco");
const quantidadeEstoque = document.getElementById("quantidadeEstoque");
const formFile = document.getElementById("formFile");
const descricaoProduto = document.getElementById("descricaoProduto");
const avaliacao = document.getElementById("avaliacao");
const btnSalvar = document.getElementById("btnSalvar");

const addButton = document.getElementById("addButton");

const nomeBusca = document.getElementById("nomeBusca");

const modalProduct = new bootstrap.Modal(document.getElementById('modalProduct'));


const realizaBusca = document.getElementById("realizaBusca");

const idTable = document.getElementById("idTable");


realizaBusca.addEventListener("click", () => {
    buscaPorNome();
})


addButton.addEventListener("click", function () {

    nomeProduto.disabled = false;
    preco.disabled = false;
    quantidadeEstoque.disabled = false;
    descricaoProduto.disabled = false;
    avaliacao.disabled = false;
    formFile.disabled = false;

    nomeProduto.value = '';
    preco.value = '';
    quantidadeEstoque.value = '';
    descricaoProduto.value = '';
    avaliacao.value = '';
    formFile.value = '';

    tituloModal.innerHTML = "Cadastro de Produtos";
})


async function chamar() {
    // Chamar a API para carregar os produtos
    await fetch("http://localhost:8080/produtos").then(response => {
        if (response.ok) {

        }
        return response.json();
    }).then((data) => {

        console.log(data);
        criarProdutos(data);


    }).catch((error) => {
        console.error(error);
    });
}

btnSalvar.addEventListener("click", function () {
    const objProduto = {
        "nomeProduto": nomeProduto.value,
        "preco": preco.value,
        "quantidadeEstoque": quantidadeEstoque.value,
        "img": formFile.value,
        "descricaoProduto": descricaoProduto.value,
        "avaliacao": avaliacao.value
    }

    console.log(objProduto);


    // Chamar a API para cadastrar o produto
    fetch("http://localhost:8080/produtos", {
        method: "POST",
        body: JSON.stringify(objProduto),
        headers: {
            "Content-Type": "application/json",
        },

    }).then(response => {

        if (response.status != 202) {
            throw new Error("Verifique os dados");
        } else {
            Swal.fire({
                position: "center",
                title: "Produto cadastrado com sucesso",
                showConfirmButton: false,
                icon: 'success',
                timer: 1500
            })

            setTimeout(function () {
                location.reload();
            }, 2000);


        }
        return response.text();
    }).catch((error) => {

        console.log(error);
        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Verifique os dados novamente!",
            showConfirmButton: false,
            timer: 1500
        });
    });

})



async function criarProdutos(dados) {

    dados.forEach(function (dado) {

        console.log(dado);

        var tbody = document.createElement("tbody");
        var rowTable = document.createElement("tr");
        var tdCodigo = document.createElement("th");
        var tdNome = document.createElement("td");
        var tdQuantidade = document.createElement("td");
        var tdValor = document.createElement("td");
        var tdStatus = document.createElement("td");
        var tdAlterar = document.createElement("td");
        var tdInativar = document.createElement("td");
        var tdAtivar = document.createElement("td");
        var tdVisualizar = document.createElement("td");


        var buttonEditProduct = document.createElement("button");
        var buttonActive = document.createElement("button");
        var buttonDeactivate = document.createElement("button");
        var buttonVisualize = document.createElement("button");


        buttonActive.onclick = function () { activate(dado) }
        buttonDeactivate.onclick = function () { deactivate(dado) }

        buttonEditProduct.onclick = function () {
            //PREPARA CAMPOS PARA EDIÇÃO DE PRODUTO.
            editar = true;


            nomeProduto.disabled = false;
            preco.disabled = false;
            quantidadeEstoque.disabled = false;
            descricaoProduto.disabled = false;
            avaliacao.disabled = false;
            formFile.disabled = false;

            nomeProduto.value = dado.nome;
            preco.value = dado.preco
            quantidadeEstoque.value = dado.quantidadeEstoque;
            descricaoProduto.value = dado.descricao;
            avaliacao.value = dado.avaliacao;

            // MONTA OBJETO COM CAMPOS QUE SERÃO UTILIZADOS NAS TRANSAÇÕES DE DADOS.
            // var objEditar = {
            //     "id": dado.id,
            //     "cpf": dado.cpf,
            //     "nomeUsuario": dado.nomeUsuario,
            //     "email": dado.email,
            //     "senha": dado.senha,
            //     "active": dado.active,
            //     "grupo": dado.grupo
            // }

            tituloModal.innerHTML = 'Editar';

            //ATRIBUI VARIÁVEL GLOBAL DE DADOS.
            // objetoEditar = objEditar;

            //ABRE MODAL
            modalProduct.show();
        }

        buttonVisualize.onclick = function () {

            nomeProduto.value = dado.nome;
            preco.value = dado.preco
            quantidadeEstoque.value = dado.quantidadeEstoque;
            descricaoProduto.value = dado.descricao;
            avaliacao.value = dado.avaliacao;

            nomeProduto.disabled = true;
            preco.disabled = true;
            quantidadeEstoque.disabled = true;
            descricaoProduto.disabled = true;
            avaliacao.disabled = true;
            formFile.disabled = true;

            tituloModal.innerHTML = 'Visualizar';

            modalProduct.show();
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


        //Botão Editar
        rowTable.appendChild(tdAlterar);
        tdAlterar.appendChild(buttonEditProduct)

        //Botão Inativar
        rowTable.appendChild(tdInativar);
        tdInativar.appendChild(buttonDeactivate)

        //Botão Ativar
        rowTable.appendChild(tdAtivar);
        tdAtivar.appendChild(buttonActive);

        //Botão Visualizar
        rowTable.appendChild(tdVisualizar);
        tdVisualizar.appendChild(buttonVisualize);


        // //SETA CADA CAMPO INDIVIDUALMENTE
        tdCodigo.innerHTML = dado.id;
        tdNome.innerHTML = dado.nome;
        tdQuantidade.innerHTML = dado.quantidadeEstoque;
        tdValor.innerHTML = dado.preco;
        tdStatus.innerHTML = dado.ativo;

        buttonActive.innerHTML = "Ativar"
        buttonDeactivate.innerHTML = "Inativar"
        buttonEditProduct.innerHTML = "Alterar"
        buttonVisualize.innerHTML = "Visualizar"


        // //VALIDAÇÃO PARA MOSTRAR EM TEXTO O VALOR DE 0 OU 1
        dado.ativo == true ? tdStatus.innerHTML = "Ativo" : tdStatus.innerHTML = "Inativo";




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

//FUNÇÃO QUE DESATIVA PRODUTO
async function deactivate(objetoDesativar) {

    console.log(objetoDesativar);

    const objetoDesativarBody = {
        "id": objetoDesativar.id,
        "nome": objetoDesativar.nome,
        "avaliacao": objetoDesativar.avaliacao,
        "descricao": objetoDesativar.descricao,
        "preco": objetoDesativar.preco,
        "quantidadeEstoque": objetoDesativar.quantidadeEstoque,

    }

    await fetch("http://localhost:8080/produtos/desativar", {
        method: "PUT",
        body: JSON.stringify(objetoDesativarBody),
        headers: {
            "Content-Type": "application/json",
        },

    }).then(response => {
        if (response.status != 200) {
            throw new Error("Verifique os dados");
        } else {

            Swal.fire({
                position: "center",
                title: "Produto desativado na base de dados!",
                showConfirmButton: false,
                icon: 'success',
                timer: 1500
            })

            setTimeout(function () {
                location.reload();
            }, 2000);

        }
        return response.text();
    }).catch((error) => {

        console.log(error);
        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Verifique os dados novamente!",
            showConfirmButton: false,
            timer: 1500
        });
    });
}



//FUNÇÃO QUE ATIVA Produto.
async function activate(objetoAtivar) {

    console.log(objetoAtivar);

    const objetoAtivarBody = {
        "id": objetoAtivar.id,
        "nome": objetoAtivar.nome,
        "avaliacao": objetoAtivar.avaliacao,
        "descricao": objetoAtivar.descricao,
        "preco": objetoAtivar.preco,
        "quantidadeEstoque": objetoAtivar.quantidadeEstoque,

    }


    // CHAMA O ENDPOINT DE PUT
    await fetch("http://localhost:8080/produtos/ativar", {
        method: "PUT",
        body: JSON.stringify(objetoAtivarBody),
        headers: {
            "Content-Type": "application/json",
        },

    }).then(response => {
        if (response.status != 200) {
            throw new Error("Verifique os dados");
        } else {
            Swal.fire({
                position: "center",
                title: "Produto ativo na base de dados!",
                showConfirmButton: false,
                icon: 'success',
                timer: 1500
            })

            setTimeout(function () {
                location.reload();
            }, 2000);

        }
        return response.text();
    }).catch((error) => {

        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Verifique os dados novamente!",
            showConfirmButton: false,
            timer: 1500
        });
    });
}

async function buscaPorNome() {
    const nome = nomeBusca.value;

    const endpointMontado = `http://localhost:8080/produtos/produto/${nome}`;

    console.log(endpointMontado);

    await fetch(endpointMontado).then(response => {
        if (response.ok) {

        }
        return response.json();
    }).then((dado) => {


        idTable.innerHTML = '';;

        console.log(dado);
        criarProdutos(dado);

    }).catch((error) => {
        console.error(error);

        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Produto não encontrado.",
            showConfirmButton: false,
            timer: 1500
        });
    });

}

