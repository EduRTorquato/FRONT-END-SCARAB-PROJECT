// listar.js

document.addEventListener('DOMContentLoaded', function() {
    
    const btnListarProduto = document.getElementById('btnListarProduto');
    const btnListarUsuario = document.getElementById('btnListarUsuario');
    const btnListarPedidos = document.getElementById('btnListarPedidos');

    function redirectToProduto(event) {
        event.preventDefault(); 
        window.location.href = '../html/listar_produto.html'; // Redireciona para index.html
    }

    function redirectToUsuario(event) {
        event.preventDefault(); 
        window.location.href = '../html/listar_usuario.html'; // Redireciona para index.html
    }

    function redirectToPedido(event) {
        event.preventDefault(); 
        window.location.href = '../html/listar_pedido.html'; // Redireciona para index.html
    }

   

    // Adiciona eventos de clique aos links
    btnListarProduto.addEventListener('click', redirectToProduto);
    btnListarUsuario.addEventListener('click', redirectToUsuario);
    btnListarPedidos.addEventListener('click', redirectToPedido);
});
