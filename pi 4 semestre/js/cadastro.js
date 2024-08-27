// cadastro.js

// Espera o DOM ser carregado
document.addEventListener('DOMContentLoaded', function() {
    // Obtém referência ao botão pelo ID
    const btnEntrar = document.getElementById('btnEntrar');

    // Adiciona o evento de clique ao botão
    btnEntrar.addEventListener('click', function(event) {
        event.preventDefault(); // Previne o comportamento padrão do formulário

        // Redireciona para listar.html
        window.location.href = '../html/listar.html'; // Ajuste o caminho conforme a estrutura do seu projeto
    });
});
