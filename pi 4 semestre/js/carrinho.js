function addToCart(product) {
    const cep = document.getElementById('cep').value;

    // Verifica se o CEP foi preenchido
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
    displayCart(); // Atualiza a exibição do carrinho
}

function displayCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Limpa a lista antes de mostrar os produtos

    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Recupera o carrinho
    let grandTotal = 0; // Variável para calcular o total geral

    cart.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - R$ ${product.totalPrice.toFixed(2)} - ${product.quantity} unidade(s)`;
        
        // Criar botão de remoção
        const removeButton = document.createElement('button');
        removeButton.textContent = '🗑️';
        removeButton.onclick = () => removeFromCart(product.name); // Passa o nome do produto

        li.appendChild(removeButton);
        cartList.appendChild(li);
        
        // Soma os totais
        grandTotal += product.totalPrice;
    });

    // Atualiza o total geral no HTML
    document.getElementById('total').textContent = `Total: R$ ${grandTotal.toFixed(2)}`;
}

function removeFromCart(productName) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(product => product.name !== productName); // Remove o produto pelo nome
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    displayCart(); // Atualiza a exibição do carrinho
}

function togglePaymentFields() {
    const method = document.getElementById('payment-method').value;
    document.getElementById('credit-card-fields').style.display = method === 'credit-card' ? 'block' : 'none';
    document.getElementById('pix-fields').style.display = method === 'pix' ? 'block' : 'none';
}

function finalizePurchase() {
    const method = document.getElementById('payment-method').value;
    const cep = document.getElementById('cep').value;

    // Verifica se o CEP foi preenchido
    if (!cep) {
        alert('Por favor, preencha o CEP antes de finalizar a compra.');
        return;
    }

    // Verifica se um método de pagamento foi selecionado
    if (!method) {
        alert('Por favor, selecione um método de pagamento.');
        return;
    }

    // Verifica os campos do cartão de crédito se o método for cartão
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

// Inicializa a exibição do carrinho
displayCart();
