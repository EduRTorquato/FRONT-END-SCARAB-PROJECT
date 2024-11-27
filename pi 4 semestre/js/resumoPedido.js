
// Recupera o usuário do sessionStorage
const user = JSON.parse(sessionStorage.getItem("user"));




//Componente de endereços
const enderecoId = document.getElementById("enderecoId");

//Coleta dados do pedido
const dadosPedido = JSON.parse(sessionStorage.getItem("order"));

//Valor total da compra
const valorTotalCompra = document.getElementById("valorTotalCompra");

const btnFinsh = document.getElementById("btnFinsh");

const inputState = document.getElementById("inputState");


//SETA VALORES IMPORTANTES DO RESUMO
const finishedOrder = JSON.parse(sessionStorage.getItem("finishedOrder"));
findAddressById(finishedOrder.enderecoId);
inputState.value = finishedOrder.metodoPgto;
valorTotalCompra.innerHTML = dadosPedido.valor_compra;


// Exibe os itens no carrinho ao carregar a página
displayOrders();

// Exibe os itens no carrinho
function displayOrders() {

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

        //const btnRemover = document.createElement("button");

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
        // btnRemover.innerHTML = "Remover";
        // btnRemover.classList.add("btn", "btn-danger", "btn-sm", "me-2");

        cartList.appendChild(rowProduct);
        rowProduct.appendChild(itemLine);
        itemLine.appendChild(imgProduct);

        itemLine.appendChild(colNome);
        colNome.appendChild(nomeProduct);
        colNome.appendChild(descricao);

        itemLine.appendChild(colQuantidade);
        colQuantidade.appendChild(titleQtd);
        //colQuantidade.appendChild(inputQtd);

        itemLine.appendChild(divValue);
        divValue.appendChild(valueTitle);
        divValue.appendChild(price);

        itemLine.appendChild(divLixeira);
        //itemLine.appendChild(btnRemover); // Adiciona o botão "Remover" ao item

        nomeProduct.innerHTML = product.name;
        imgProduct.src = product.pic;
        price.innerHTML = `R$ ${(product.price * product.quantity).toFixed(2)}`;
        valueTitle.innerHTML = "Valor";
        grandTotal += product.totalPrice;



        //  total.textContent = `R$ ${grandTotal.toFixed(2)}`;


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
        // btnRemover.addEventListener("click", function () {
        //     removeFromCart(product.name);
        // });
    });
}


// Função que busca o endereço do usuário
async function findAddressById(addressId) {

    const endpoint = `http://localhost:8080/endereco/${addressId}`;

    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const dados = await response.json();
    const enderecoMontado = "Bairro: " + dados.bairro + ", " + dados.rua + " Número: " + dados.numero;
    enderecoId.textContent = enderecoMontado;
}


btnFinsh.addEventListener("click", function () {


    fetch("http://localhost:8080/pedidos", {
        method: "POST",
        body: JSON.stringify(finishedOrder),
        headers: {
            "Content-Type": "application/json",
        },

    }).then(response => {

        if (response.status != 202) {
            throw new Error("Verifique os dados");
        }else {
            Swal.fire({
                position: "center",
                title: "Pedido Finalizado!",
                showConfirmButton: false,
                icon: 'success',
                timer: 1500
            })

            setTimeout(function () {
                window.location.href = "home.html";
                localStorage.removeItem('cart');

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