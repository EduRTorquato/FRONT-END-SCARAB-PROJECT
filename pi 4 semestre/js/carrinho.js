let freteCalculado = false;  // Variável para controlar se o frete já foi calculado
let totalProdutosFrete = 0;  // Variável para armazenar o valor total dos produtos
let totalFinalGlobal = 0;

const userCard = JSON.parse(sessionStorage.getItem("user"));
const btnFinsh = document.getElementById("btnFinsh");
sessionStorage.setItem("finishingOrder", true);

// Exibe os itens no carrinho
function displayCart() {

    const cartList = document.getElementById('listCarrinho');
    cartList.innerHTML = '';

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let grandTotal = 0;

    const total = document.getElementById("total");


    cart.forEach(product => {



        const rowProduct = document.createElement("div");
        const itemLine = document.createElement("div");
        const imgProduct = document.createElement("img");
        const colNome = document.createElement("div");
        const nomeProduct = document.createElement("h5");
        const descricao = document.createElement("p");

        const colQuantidade = document.createElement("div");
        const titleQtd = document.createElement("h5");
        const inputQtd = document.createElement("input");
        const divValue = document.createElement("div");
        const valueTitle = document.createElement("h5");
        const price = document.createElement("p");

        const divLixeira = document.createElement("div");

        const btnRemover = document.createElement("button");

        rowProduct.classList.add("row");
        itemLine.classList.add("item");

        colNome.classList.add("col");
        colQuantidade.classList.add("col");
        colQuantidade.classList.add("quantidade");

        divValue.classList.add("col");

        inputQtd.type = "number";
        inputQtd.min = 1;
        inputQtd.value = product.quantity;
        inputQtd.style.width = "50px";
        inputQtd.classList.add("input-qtd");

        divLixeira.classList.add("col");


        // Botão de remover
        btnRemover.innerHTML = "Remover";
        btnRemover.classList.add("btn", "btn-danger", "btn-sm", "me-2");

        cartList.appendChild(rowProduct);
        rowProduct.appendChild(itemLine);
        itemLine.appendChild(imgProduct);

        itemLine.appendChild(colNome);
        colNome.appendChild(nomeProduct);
        colNome.appendChild(descricao);

        itemLine.appendChild(colQuantidade);
        colQuantidade.appendChild(titleQtd);
        colQuantidade.appendChild(inputQtd);

        itemLine.appendChild(divValue);
        divValue.appendChild(valueTitle);
        divValue.appendChild(price);

        itemLine.appendChild(divLixeira);
        itemLine.appendChild(btnRemover); // Adiciona o botão "Remover" ao item

        nomeProduct.innerHTML = product.name;
        imgProduct.src = product.pic;
        price.innerHTML = `R$ ${(product.price * product.quantity).toFixed(2)}`;
        valueTitle.innerHTML = "Valor";
        grandTotal += product.totalPrice;



        total.textContent = `R$ ${grandTotal.toFixed(2)}`;


        inputQtd.addEventListener("input", function () {

            grandTotal = 0;
            price.innerHTML = `R$ ${(product.price * inputQtd.value).toFixed(2)}`;

            product.totalPrice = product.price * inputQtd.value;

            cart.forEach(product => {

                grandTotal += product.totalPrice;
            });
            totalProdutosFrete = grandTotal;

            total.textContent = `R$ ${grandTotal}`;

            grandTotal = 0;
        });

        // Evento do botão "Remover"
        btnRemover.addEventListener("click", function () {
            removeFromCart(product.name);
        });
    });

    document.getElementById('totalProdutosFrete').textContent = `R$ ${totalProdutosFrete.toFixed(2)}`;
    updateTotal();
}

// Atualiza o valor total no resumo
function updateTotal() {
    const frete = parseFloat(document.getElementById('frete').textContent.replace("R$ ", ""));
    const totalFinal = (totalProdutosFrete + frete).toFixed(2);
    document.getElementById('totalProdutosFrete').textContent = `R$ ${totalFinal}`;

}

// Remove um produto do carrinho
function removeFromCart(productName) {

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(product => product.name !== productName);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    displayCart();
}

// Atualiza o carrinho quando a quantidade é alterada
function updateCart() {
    totalProdutos = 0;
    displayCart();
}

// Função para calcular o frete
function calcularFrete() {
    if (freteCalculado) {
        // Exibe o alerta informando que o frete já foi calculado
        Swal.fire({
            icon: 'warning',
            title: 'Aviso!',
            text: 'O frete já foi calculado.',
            confirmButtonText: 'OK'
        });
        return;
    }

    // Simula o cálculo do frete
    const fretes = [15, 20, 50];
    const freteEscolhido = fretes[Math.floor(Math.random() * fretes.length)];

    document.getElementById('frete').textContent = `R$ ${freteEscolhido.toFixed(2)}`;
    document.getElementById('freteExibido').textContent = `Frete: R$ ${freteEscolhido.toFixed(2)}`; // Atualiza o valor exibido abaixo do CEP



    totalFinalGlobal = (freteEscolhido + totalProdutosFrete).toFixed(2);


    updateTotal();

    // Marca o frete como calculado
    freteCalculado = true;

    // Desabilita o botão após calcular o frete
    document.getElementById('btnFrete').disabled = true;
}

// Adiciona evento ao botão de calcular frete
document.getElementById('btnFrete').addEventListener('click', function () {
    calcularFrete();
});

btnFinsh.addEventListener("click", function () {

    if (userCard != null) {

        const date = new Date();

        const pedido = {
            "client_id": userCard.id,
            "data_compra": date.toISOString(),
            "qtd_itens": JSON.parse(localStorage.getItem('cart')).length,
            "valor_compra": totalFinalGlobal

        }

        sessionStorage.setItem("order", JSON.stringify(pedido));

        window.location.href = "finalizarPedidos.html";
    } else {
        Swal.fire({
            title: "Atenção",
            text: "É necessário estar logado para finalizar a compra!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Login"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href="loginUsuario.html"
                sessionStorage.setItem("finishingOrder", true);
            }
        });
    }


})

// Exibe os itens no carrinho ao carregar a página
displayCart();