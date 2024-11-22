var dado = JSON.parse(sessionStorage.getItem("produto"));
var user = JSON.parse(sessionStorage.getItem("user"));

//sessionStorage.clear();

const containerCard = document.getElementById("containerCard");
const userProfile = document.getElementById("userProfile");
const userProfilePic = document.getElementById("userProfilePic");

setaDados();


function setaDados(){

    if(user != null){   
        userProfile.innerHTML = user.nome;
        
        logout = document.createElement("a");
        
        userProfile.appendChild(logout);
        
        logout.innerHTML = "Logout"
        
        logout.style = "color: white; cursor: pointer;";
        
        logout.onclick = function () {
            window.location.href = "loginUsuario.html";
            sessionStorage.clear();
        }
    }
    
}

getProduct(dado);

// DADOS DA TELA
descricaoProduto = document.getElementById("descricaoProduto");
preco = document.getElementById("preco");
nomeProduto = document.getElementById("nomeProduto");
carrosselItem = document.getElementById("carrosselItem");
valorTotal = document.getElementById("valorTotal"); 
const addCart = document.getElementById("addtoCart");

function addToCart(name, price, pic, descricao) {

    const quantity = parseInt(document.getElementById('quantity').value);

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.name === name);

    if (existingProductIndex > -1) {
        // Atualiza a quantidade e o total
        cart[existingProductIndex].quantity += quantity;
        cart[existingProductIndex].totalPrice += price * quantity;
    } else {
        // Adiciona o novo produto
        cart.push({ name, pic, descricao, price, quantity, totalPrice: price * quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${quantity} unidades de ${name} adicionadas ao carrinho! Clique no ícone de carrinho para ver todos os itens e finalizar sua compra.`);
}

// Atualiza o valor total com base na quantidade
document.getElementById('quantity').addEventListener('input', atualizarValorTotal);

// Atualiza valores
function atualizarValorTotal() {
    let valorUnitario = dado.preco;
    let quantidade = parseInt(document.getElementById('quantity').value) || 0;
    let novoValor = valorUnitario * quantidade;

    document.getElementById('valorTotal').innerText = 'R$ ' + novoValor.toFixed(2).replace('.', ',');
}

// Monta o produto selecionado na tela
function getProduct(dado) {
    nomeProduto.innerHTML = dado.nome;
    descricaoProduto.innerHTML = dado.descricao;
    preco.innerHTML = "R$ " + dado.preco;
    valorTotal.innerHTML = "R$ " + dado.preco;

    dado.imagens.forEach(element => {
        const divImgCarrossel = document.createElement("div");
        const imgProdutos = document.createElement("img");

        divImgCarrossel.classList.add("carousel-item");

        element.principal ? divImgCarrossel.classList.add("active") : divImgCarrossel.classList.add("inactive");

        carrosselItem.appendChild(divImgCarrossel);
        divImgCarrossel.appendChild(imgProdutos);

        imgProdutos.src = element.caminho;
    });
}

// Evento de adicionar ao carrinho
addCart.addEventListener("click", function () {
    addToCart(dado.nome, dado.preco, dado.imagens[0].caminho, dado.descricao);
});
