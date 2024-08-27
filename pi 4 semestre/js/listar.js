// listar.js

document.addEventListener('DOMContentLoaded', function() {
    
    const btnListarProduto = document.getElementById('btnListarProduto');
    const btnListarUsuario = document.getElementById('btnListarUsuario');
    const btnListarPedidos = document.getElementById('btnListarPedidos');

    function redirectToIndex(event) {
        event.preventDefault(); 
        window.location.href = '../index.html'; // Redireciona para index.html
    }

    // Adiciona eventos de clique aos links
    btnListarProduto.addEventListener('click', redirectToIndex);
    btnListarUsuario.addEventListener('click', redirectToIndex);
    btnListarPedidos.addEventListener('click', redirectToIndex);
});
