$('#preco').mask('000.000.000.000.000.00', { reverse: true });
chamar();


//ARRAY PARA OS DADOS A SEREM SALVOS
var arrayImages = [];

const objImageEnviar = {};

var isEdit = false;

//IMAGENS 
var imagesList = [

]

var imagesDefault = [
    "../IMAGENS/imgUpload/bip.jpg",
    "../IMAGENS/imgUpload/vinilb.jpg",
    "../IMAGENS/imgUpload/vinilrpm.jpg",
    "../IMAGENS/imgUpload/vitrola.jpg",
    "../IMAGENS/imgUpload/walkman.jpg",
    "../IMAGENS/imgUpload/comando.jpg",
    "../IMAGENS/imgUpload/minigame.jpg",
    "../IMAGENS/imgUpload/malandro.jpg",
]


const nomeProduto = document.getElementById("nomeProduto");
const preco = document.getElementById("preco");
const quantidadeEstoque = document.getElementById("quantidadeEstoque");
const descricaoProduto = document.getElementById("descricaoProduto");
const avaliacao = document.getElementById("avaliacao");
const btnSalvar = document.getElementById("btnSalvar");
const addButton = document.getElementById("addButton");
const nomeBusca = document.getElementById("nomeBusca");
const imgSelect = document.getElementById("imgSelect");
const btnImagens = document.getElementById("btnImagens");
const buttonSelectFotos = document.getElementById("buttonSelectFotos");
const realizaBusca = document.getElementById("realizaBusca");
const idTable = document.getElementById("idTable");
const tableImages = document.getElementById("tableImages");

const checkboxLabel = document.getElementById("checkboxLabel");
/// MODAIS ///
const modalProduct = new bootstrap.Modal(document.getElementById('modalProduct'));
const modalFotos = new bootstrap.Modal(document.getElementById('modalFotos'));
/// MODAIS ///


//CHECKBOX IMAGE
// checkboxLabel.addEventListener("change", () => {
//     objImage = {
//         "principal": false,
//         "caminho": "/imagens/produto1/TESTE.jpg"
//     }

//     (objImage);

//     arrayImages.push(objImage);


//     (arrayImages);
// })


//BUSCA POR NOME

realizaBusca.addEventListener("click", () => {
    buscaPorNome();
})

//ABRE DISPLAY DE FOTOS
buttonSelectFotos.addEventListener("click", () => {
    modalFotos.show();
    modalProduct.hide();

    console.log(isEdit);

    if (isEdit) {
        ('TÁ EDITANDO')


        console.log(imagesList);

        putImagesOnArray(imagesList);
        imagesList = [];

    } else {
        //imagesList = [];


        putImagesOnArray(imagesDefault);
        imagesDefault = [];
    }

})

//FECHA DISPLAY DE FOTOS
btnImagens.addEventListener("click", () => {
    modalFotos.hide();
    modalProduct.show();


})

//ABRE MODAL DE CADASTRO
addButton.addEventListener("click", function () {

    isEdit = false;

    nomeProduto.disabled = false;
    preco.disabled = false;
    quantidadeEstoque.disabled = false;
    descricaoProduto.disabled = false;
    avaliacao.disabled = false;

    nomeProduto.value = '';
    preco.value = '';
    quantidadeEstoque.value = '';
    descricaoProduto.value = '';
    avaliacao.value = '';

    tituloModal.innerHTML = "Cadastro de Produtos";
})



//BUSCAR PRODUTOS NO BACK
async function chamar() {
    // Chamar a API para carregar os produtos
    await fetch("http://localhost:8080/produtos").then(response => {
        if (response.ok) {

        }
        return response.json();
    }).then((data) => {
        criarProdutos(data);


    }).catch((error) => {
        console.error(error);
    });
}

//SALVA PRODUTO
btnSalvar.addEventListener("click", function () {
    const objProduto = {
        "nome": nomeProduto.value,
        "preco": preco.value,
        "quantidadeEstoque": quantidadeEstoque.value,
        "descricao": descricaoProduto.value,
        "avaliacao": avaliacao.value,
        "imagens": arrayImages
    }

        (objProduto);


    // Chamar a API para cadastrar o produto
    fetch("http://localhost:8080/produtos", {
        method: "POST",
        body: JSON.stringify(objProduto),
        headers: {
            "Content-Type": "application/json",
        },

    }).then(response => {

        if (response.status != 201) {
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

        (error);
        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Verifique os dados novamente!",
            showConfirmButton: false,
            timer: 1500
        });
    });

})


// MONTA TABELAS COM PRODUTOS
async function criarProdutos(dados) {


    dados.forEach(function (dado) {



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
            isEdit = true;


            nomeProduto.disabled = false;
            preco.disabled = false;
            quantidadeEstoque.disabled = false;
            descricaoProduto.disabled = false;
            avaliacao.disabled = false;

            nomeProduto.value = dado.nome;
            preco.value = dado.preco
            quantidadeEstoque.value = dado.quantidadeEstoque;
            descricaoProduto.value = dado.descricao;
            avaliacao.value = dado.avaliacao;


            dado.imagens.forEach(element => {
                imagesList.push(element.caminho);
            });

            tituloModal.innerHTML = 'Editar';

            //ATRIBUI VARIÁVEL GLOBAL DE DADOS.
            // objetoEditar = objEditar;

            //ABRE MODAL
            modalProduct.show();
        }

        buttonVisualize.onclick = function () {

            (JSON.stringify(dado));
            sessionStorage.setItem("produto", JSON.stringify(dado));
            window.location = "./detalhe.html"

            // nomeProduto.value = dado.nome;
            // preco.value = dado.preco
            // quantidadeEstoque.value = dado.quantidadeEstoque;
            // descricaoProduto.value = dado.descricao;
            // avaliacao.value = dado.avaliacao;

            // nomeProduto.disabled = true;
            // preco.disabled = true;
            // quantidadeEstoque.disabled = true;
            // descricaoProduto.disabled = true;
            // avaliacao.disabled = true;

            // tituloModal.innerHTML = 'Visualizar';

            // modalProduct.show();
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

//FUNÇÃO QUE DESATIVA PRODUTO
async function deactivate(objetoDesativar) {


    await fetch(`http://localhost:8080/produtos/${objetoDesativar.id}/desativar`, {
        method: "PUT",
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

        (error);
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

    (objetoAtivar);

    // CHAMA O ENDPOINT DE PUT
    await fetch(`http://localhost:8080/produtos/${objetoAtivar.id}/ativar`, {
        method: "PUT",
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

//ENCONTRA OBJETOS POR NOME
async function buscaPorNome() {
    const nome = nomeBusca.value;

    const endpointMontado = `http://localhost:8080/produtos/produto/${nome}`;

    (endpointMontado);

    await fetch(endpointMontado).then(response => {
        if (response.ok) {

        }
        return response.json();
    }).then((dado) => {


        idTable.innerHTML = '';;

        (dado);
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

async function putImagesOnArray(params) {
    params.forEach((imagem) => {

        var tableimg = document.createElement("tbody");
        var rowImg = document.createElement("tr");
        var imgData = document.createElement("img");
        var checkBox = document.createElement("input");
        var radioButton = document.createElement("input");
        var tdImagem = document.createElement("td");
        var tdCheckBox = document.createElement("td");
        var tdRadio = document.createElement("td");


        imgData.src = imagem;


        imgData.classList.add("imgSelect");

        //CHECKBOX
        checkBox.classList.add("form-check-input");
        checkBox.type = "checkbox";

        radioButton.classList.add("form-check-input");
        radioButton.type = "radio";

        tableImages.appendChild(tableimg);
        tableimg.appendChild(rowImg);
        rowImg.appendChild(tdImagem);
        rowImg.appendChild(tdCheckBox);
        rowImg.appendChild(tdRadio);


        tdImagem.appendChild(imgData);
        tdCheckBox.appendChild(checkBox);
        tdRadio.appendChild(radioButton);


        checkBox.onchange = function () {

            if (checkBox.checked == true) {
                const objImagem = {
                    caminho: imagem,
                    principal: radioButton.checked
                }
                arrayImages.push(objImagem);

            } else {
                arrayImages.pop();
            }
            (arrayImages);
        };

    });
    

}

