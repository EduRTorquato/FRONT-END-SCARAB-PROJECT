chamarProdutos();

const containerCard = document.getElementById("containerCard");

//BUSCAR PRODUTOS NO BACK
async function chamarProdutos() {
    // Chamar a API para carregar os produtos
    await fetch("http://localhost:8080/produtos").then(response => {
        if (response.ok) {

        }
        return response.json();
    }).then((data) => {

        console.log(data);
        criaCardsProdutos(data);


    }).catch((error) => {
        console.error(error);
    });
}

function verificaPrincipal(array){
    
    return array.filter();
}

function criaCardsProdutos(data){

    data.forEach(element => {
        console.log(1 + 1);

        var card = document.createElement("div");
        var image = document.createElement("img");
        var nomeProduto = document.createElement("p");
        var preco = document.createElement("p");
        var link = document.createElement('a');
        var button = document.createElement("button");


        verificaPrincipal(data.imagens);
    });


}