// Recupera o usuário do sessionStorage
const user = JSON.parse(sessionStorage.getItem("user"));

const enderecos = document.getElementById("enderecos");

const dadosPedido = JSON.parse(sessionStorage.getItem("order"));

const valorTotalCompra = document.getElementById("valorTotalCompra");


console.log(dadosPedido);
valorTotalCompra.innerHTML = dadosPedido.valor_compra;

//Encontra os dados do usuário
findById(user.id);

// Exibe os itens no carrinho ao carregar a página
displayCart();

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
            console.log(grandTotal);
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
// Função que busca os endereços do usuário
async function findById(userId) {

    console.log(user);
    const endpoint = `http://localhost:8080/endereco/${userId}`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const dados = await response.json();

        console.log(dados);

        loadAddress(dados);
        
        // Chama a função para exibir os endereços
       // displayAddresses(dados);
    } catch (error) {
        console.error("Erro ao buscar endereços:", error);
        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Usuário não encontrado.",
            showConfirmButton: false,
            timer: 1500
        });
    }
}

async function loadAddress(params) {

    params.forEach((dado) => {

        var tableAddress = document.createElement("tbody");
        var rowStreet = document.createElement("tr");
        var street = document.createElement("p");
        var radioButton = document.createElement("input");
        var tdRadio = document.createElement("td");


        radioButton.classList.add("form-check-input");
        radioButton.type = "radio";

        enderecos.appendChild(tableAddress);
        tableAddress.appendChild(rowStreet);
        rowStreet.appendChild(tdRadio);
        rowStreet.appendChild(street);

        tableAddress.classList.add("tableAddress");

        street.innerHTML = dado.complemento + dado.cep

        // tdCheckBox.appendChild(checkBox);
        tdRadio.appendChild(radioButton);


    });
    

}