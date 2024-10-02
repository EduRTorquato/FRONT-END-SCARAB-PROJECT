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

function verificaPrincipal(array) {
    const principalItem = array.find(function(dado) {
        return dado.principal;
    });

    return principalItem ? principalItem.caminho : "../IMAGENS/imgUpload/noimg.jpg";
}

function criaCardsProdutos(data){

    data.forEach(element => {


        var card = document.createElement("div");
        var image = document.createElement("img");
        var nomeProduto = document.createElement("p");
        var preco = document.createElement("p");
        var link = document.createElement('a');
        var button = document.createElement("button");
        var span  = document.createElement("span");


        console.log(verificaPrincipal(element.imagens));

        card.classList.add("card");
        nomeProduto.classList.add("nomeProduto");
        preco.classList.add("preco");
        button.classList.add("btn");
        button.classList.add("btn-light");
        span.classList.add("star");
        

        containerCard.appendChild(card);
        card.appendChild(span);
        card.appendChild(image);
        card.appendChild(nomeProduto);
        card.appendChild(preco);
        card.appendChild(link);
        link.appendChild(button);

        if(element.avaliacao >= 1 && element.avaliacao < 2 ){
            span.innerHTML ="★";
        }
        else if(element.avaliacao >= 2 && element.avaliacao < 3 ){
            span.innerHTML ="★ ★";
        }
        else if(element.avaliacao >= 3 && element.avaliacao < 4 ){
            span.innerHTML ="★ ★ ★ ";
        }
        else if(element.avaliacao >= 4 && element.avaliacao < 5){
            span.innerHTML ="★ ★ ★ ★ ";
        }
        else{
            span.innerHTML ="★ ★ ★ ★ ★";
        }
        
        
        image.src = verificaPrincipal(element.imagens);
        nomeProduto.innerHTML = element.nome;
        preco.innerHTML = element.preco;
        button.innerHTML = "Comprar"

      


    });


}