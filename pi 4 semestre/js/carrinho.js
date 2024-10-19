const listaCarrinho = document.getElementById("listCarrinho");

displayCart();

let freteCalculado = false;  // Variável para controlar o cálculo do frete

function addToCart(product) {
    const cep = document.getElementById('cep').value;

    if (!cep) {
        alert('Por favor, preencha o CEP antes de adicionar produtos ao carrinho.');
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity += product.quantity;
        existingProduct.totalPrice += product.price * product.quantity;
    } else {
        product.quantity = parseInt(document.getElementById('quantity').value, 10);
        product.totalPrice = product.price * product.quantity;
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    
    if (!freteCalculado) {
        calcularFrete();  // Calcula o frete apenas se não foi calculado antes
    }
}

function displayCart() {
    const cartList = document.getElementById('listCarrinho');
    cartList.innerHTML = '';

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let grandTotal = 0;

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
        const value = document.createElement("p");

        rowProduct.classList.add("row");
        itemLine.classList.add("item");
        
        colNome.classList.add("col");
        colQuantidade.classList.add("col");
        colQuantidade.classList.add("quantidade");

        divValue.classList.add("col");
        inputQtd.style.width = "100px";

        listaCarrinho.appendChild(rowProduct);
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
        divValue.appendChild(value);

        nomeProduct.innerHTML = product.name;
        imgProduct.src = product.pic;
        inputQtd.value = product.quantity;
        descricao.innerHTML = product.descricao;
        value.innerHTML = product.price;

        titleQtd.innerHTML = 'Quantidade';
        valueTitle.innerHTML = 'Valor';

        grandTotal += product.totalPrice;
    });

    document.getElementById('total').textContent = `${grandTotal.toFixed(2)}`;
}

function removeFromCart(productName) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(product => product.name !== productName);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    displayCart();
}

function togglePaymentFields() {
    const method = document.getElementById('payment-method').value;
    document.getElementById('credit-card-fields').style.display = method === 'credit-card' ? 'block' : 'none';
    document.getElementById('pix-fields').style.display = method === 'pix' ? 'block' : 'none';
}

function finalizePurchase() {
    const method = document.getElementById('payment-method').value;
    const cep = document.getElementById('cep').value;

    if (!cep) {
        alert('Por favor, preencha o CEP antes de finalizar a compra.');
        return;
    }

    if (!method) {
        alert('Por favor, selecione um método de pagamento.');
        return;
    }

    const creditCardFields = document.getElementById('credit-card-fields');
    if (method === 'credit-card') {
        const inputs = creditCardFields.getElementsByTagName('input');
        if (Array.from(inputs).some(input => !input.value)) {
            alert('Por favor, preencha todos os campos do cartão de crédito.');
            return;
        }
    }

    alert('Compra finalizada com sucesso! Método de pagamento: ' + method);
}

function calcularFrete() {
    const cep = document.getElementById('cep').value;

    if (!/^\d{5}-?\d{3}$/.test(cep)) {
        Swal.fire('Erro', 'Por favor, digite um CEP válido.', 'error');
        return;
    }

    const freteValores = [10, 20, 50];
    const frete = freteValores[Math.floor(Math.random() * freteValores.length)];
    
    document.getElementById('frete').textContent = `R$ ${frete}`;

    const totalProdutos = parseFloat(document.getElementById('total').textContent);
    const totalFinal = (totalProdutos + frete).toFixed(2);
    document.getElementById('total').textContent = totalFinal;

    freteCalculado = true;  // Marca que o frete foi calculado
}

document.getElementById('cep').addEventListener('input', function() {
    const cep = document.getElementById('cep').value;
    const button = document.querySelector('.ok-button');

    if (/^\d{5}-?\d{3}$/.test(cep)) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
});

// Modificado para exibir mensagem de erro se o frete já foi calculado
document.querySelector('.ok-button').addEventListener('click', function() {
    if (freteCalculado) {
        alert("O frete já foi adicionado.");
    } else {
        calcularFrete();


        
    }
});
