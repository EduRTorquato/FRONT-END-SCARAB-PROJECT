var dado = JSON.parse(sessionStorage.getItem("produto"));


sessionStorage.clear();

getProduct(dado);


// DADOS DA TELA
descricaoProduto = document.getElementById("descricaoProduto");
preco = document.getElementById("preco");
nomeProduto = document.getElementById("nomemProduto");
carrosselItem = document.getElementById("carrosselItem");
valorTotal = document.getElementById("valorTotal"); 
const addCart = document.getElementById("addtoCart");



function addToCart(name, price, pic ,descricao) {

    const quantity = parseInt(document.getElementById('quantity').value);


    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.name === name);

    if (existingProductIndex > -1) {
        // Atualiza a quantidade e o total
        cart[existingProductIndex].quantity += quantity;
        cart[existingProductIndex].totalPrice += price * quantity;
    } else {
        // Adiciona o novo produto
        console.log("ADICIONOU");
        
        cart.push({ name, pic, descricao, price, quantity, totalPrice: price * quantity });

        console.log({ name, pic, descricao, price, quantity, totalPrice: price * quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${quantity} unidades de ${name} adicionadas ao carrinho! Clique no ícone de carrinho para ver todos os itens e finalizar sua compra.`);
}

// Atualiza o valor total com base na quantidade
document.getElementById('quantity').addEventListener('input', atualizarValorTotal);

//Atualiza valores
function atualizarValorTotal() {
    let valorUnitario = dado.preco;
    let quantidade = parseInt(document.getElementById('quantity').value) || 0;
    let novoValor = valorUnitario * quantidade;

    document.getElementById('valorTotal').innerText = 'R$ ' + novoValor.toFixed(2).replace('.', ',');
}

//Monta o produto selecionado na tela
function getProduct(dado){
    nomeProduto.innerHTML = dado.nome;
    descricaoProduto.innerHTML = dado.descricao;
    preco.innerHTML = "R$ " + dado.preco;
    valorTotal.innerHTML  = "R$ " + dado.preco;
    

    dado.imagens.forEach ( element =>{ 
        (element);

        const divImgCarrossel = document.createElement("div");
        const imgProdutos = document.createElement("img");

        divImgCarrossel.classList.add("carousel-item");
        
        element.principal ? divImgCarrossel.classList.add("active") : divImgCarrossel.classList.add("inactive");
        
        carrosselItem.appendChild(divImgCarrossel);
        divImgCarrossel.appendChild(imgProdutos);

        imgProdutos.src = element.caminho;
    })
}

// Outros scripts para calcular o frete e funcionalidades adicionais...
document.addEventListener('DOMContentLoaded', function() {
    let freteAdicionado = false;
    let valorFrete = 0; // Variável para armazenar o valor do frete

    function addToCart(name, price) {
        const cep = document.getElementById('cep').value.trim();
        const quantity = parseInt(document.getElementById('quantity').value) || 1;

        if (!cep) {
            alert("Por favor, insira seu CEP antes de adicionar o produto ao carrinho.");
            return;
        }

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(item => item.name === name);
        
        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += quantity;
            cart[existingProductIndex].totalPrice += price * quantity;
        } else {
            cart.push({ name, price, quantity, totalPrice: price * quantity });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${quantity} unidades de ${name} adicionadas ao carrinho! Clique no ícone de carrinho para ver todos os itens e finalizar sua compra.`);
    }

    const cepInput = document.getElementById('cep');
    const okButton = document.querySelector('.ok-button');

    cepInput.addEventListener('input', function() {
        okButton.disabled = !this.value.trim();
    });

    okButton.addEventListener('click', function() {
        if (!freteAdicionado) {
            valorFrete = calcularFrete(); // Armazena o valor do frete
            atualizarValorTotalComFrete(valorFrete);
            freteAdicionado = true;
        } else {
            alert("O frete já foi adicionado!");
        }
    });

    function calcularFrete() {
        const freteValores = [5, 20, 50];
        const randomIndex = Math.floor(Math.random() * freteValores.length);
        const valor = freteValores[randomIndex];
        document.getElementById('valor-frete').innerText = 'R$ ' + valor.toFixed(2).replace('.', ','); // Atualiza o valor do frete exibido
        return valor; // Retorna o valor do frete escolhido
    }

    function atualizarValorTotalComFrete(frete) {
        let valorUnitario = dado.preco;
        let quantidade = parseInt(document.getElementById('quantity').value) || 0;
        let novoValor = (valorUnitario * quantidade) + frete;

        document.getElementById('valorTotal').innerText = 'R$ ' + novoValor.toFixed(2).replace('.', ',');
    }

    document.getElementById('quantity').addEventListener('input', atualizarValorTotal);

    function atualizarValorTotal() {
        let valorUnitario = dado.preco;
        let quantidade = parseInt(document.getElementById('quantity').value) || 0;
        let novoValor = valorUnitario * quantidade;

        document.getElementById('valorTotal').innerText = 'R$ ' + novoValor.toFixed(2).replace('.', ',');
    }

    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.getAttribute('data-value');
            stars.forEach(s => {
                s.classList.remove('filled');
            });
            for (let i = 0; i < rating; i++) {
                stars[i].classList.add('filled');
            }
        });
    });
});

addCart.addEventListener("click", function(){


    (dado);

    addToCart(dado.nome, dado.preco, dado.imagens[0].caminho, dado.descricao);

})
