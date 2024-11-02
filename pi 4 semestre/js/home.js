chamarProdutos();
getUserData();

const containerCard = document.getElementById("containerCard");

const userProfile = document.getElementById("userProfile");

const userProfilePic = document.getElementById("userProfilePic");

//BUSCAR PRODUTOS NO BACK
async function chamarProdutos() {
    // Chamar a API para carregar os produtos
    await fetch("http://localhost:8080/produtos").then(response => {
        if (response.ok) {

        }
        return response.json();
    }).then((data) => {
        criaCardsProdutos(data);


    }).catch((error) => {
        console.error(error);
    });
}

function verificaPrincipal(array) {
    const principalItem = array.find(function (dado) {
        return dado.principal;
    });

    return principalItem ? principalItem.caminho : "../IMAGENS/imgUpload/noimg.jpg";
}

userProfilePic.addEventListener("click", function () {

    window.location.href = "perfilUsuario.html";

}
)

function criaCardsProdutos(data) {

    data.forEach(element => {

        if (element.ativo) {

            (element)

            var card = document.createElement("div");
            var image = document.createElement("img");
            var nomeProduto = document.createElement("p");
            var preco = document.createElement("p");
            var link = document.createElement('a');
            var button = document.createElement("button");
            var span = document.createElement("span");
            var description = document.createElement("p");


            card.classList.add("card");
            nomeProduto.classList.add("nomeProduto");
            preco.classList.add("preco");
            button.classList.add("btn");
            button.classList.add("btn-success");
            span.classList.add("star");
            description.classList.add("descricao")


            containerCard.appendChild(card);
            card.appendChild(span);
            card.appendChild(image);
            card.appendChild(nomeProduto);
            card.appendChild(description);
            card.appendChild(preco);
            card.appendChild(link);
            link.appendChild(button);

            if (element.avaliacao >= 1 && element.avaliacao < 2) {
                span.innerHTML = "★";
            }
            else if (element.avaliacao >= 2 && element.avaliacao < 3) {
                span.innerHTML = "★ ★";
            }
            else if (element.avaliacao >= 3 && element.avaliacao < 4) {
                span.innerHTML = "★ ★ ★ ";
            }
            else if (element.avaliacao >= 4 && element.avaliacao < 5) {
                span.innerHTML = "★ ★ ★ ★ ";
            }
            else {
                span.innerHTML = "★ ★ ★ ★ ★";
            }


            image.src = verificaPrincipal(element.imagens);
            nomeProduto.innerHTML = element.nome;
            preco.innerHTML = "R$" + element.preco;
            description.innerHTML = element.descricao;
            button.innerHTML = "Comprar"
            button.onclick = function () { setDados(element) }

        } else {

            ("Inativo")

        }




    });


}

async function getUserData() {

    console.log(JSON.parse(sessionStorage.getItem("client")).email);

    const email = JSON.parse(sessionStorage.getItem("client")).email;

    const endpointMontado = `http://localhost:8080/cliente/email/${email}`;

    console.log(endpointMontado);

    await fetch(endpointMontado).then(response => {
        if (response.ok) {

        }
        return response.json();
    }).then((data) => {

        console.log(data);

        sessionStorage.setItem("user", JSON.stringify(data));

        userProfile.innerHTML = data.nome;

        logout = document.createElement("a");

        userProfile.appendChild(logout);

        logout.innerHTML = "Logout"

        logout.style = "color: white; cursor: pointer;";

        logout.onclick = function () {
            window.location.href = "loginUsuario.html";
            sessionStorage.removeItem("client");
        }


    }).catch((error) => {
        console.error(error);
    });

}


function setDados(dados) {

    (JSON.stringify(dados));
    sessionStorage.setItem("produto", JSON.stringify(dados));
    window.location = "./detalhe.html"
}