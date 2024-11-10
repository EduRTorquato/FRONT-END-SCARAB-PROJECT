// Recupera o usuário do sessionStorage
const user = JSON.parse(sessionStorage.getItem("user"));
const id_sair = document.getElementById("id_sair");

// Busca os dados do usuário e os endereços
fetchUserData();
findById(user.id);



// **Adicionar o evento de clique ao elemento "Meus Dados"**
document.querySelectorAll('.linkList').forEach(link => {
    if (link.textContent.trim() === "Meus Dados") {
        link.addEventListener("click", function () {
            window.location.href = "perfilUsuario.html"; // Redireciona para a página de perfil do usuário
        });
    }
});

id_sair.addEventListener("click", function () {
    window.location.href = "loginUsuario.html";
    sessionStorage.clear();
})

// Função que busca os dados do usuário
async function fetchUserData() {
    document.getElementById('nome_id').textContent = user.nome; // Ajuste a propriedade conforme seu retorno
    document.getElementById('email_id').textContent = user.email; // Ajuste a propriedade conforme seu retorno
}

// Função que busca os endereços do usuário
async function findById(userId) {
    const endpoint = `http://localhost:8080/endereco/${userId}`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const dados = await response.json();

        // Chama a função para exibir os endereços
        displayAddresses(dados);
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

// Função para exibir os endereços
function displayAddresses(enderecos) {
    const columnAddress = document.querySelector('.columnAddress');
    columnAddress.innerHTML = ''; // Limpa a coluna antes de adicionar novos dados

    // Verifica se há endereços
    if (!enderecos || enderecos.length === 0) {
        columnAddress.innerHTML = '<p>Nenhum endereço encontrado.</p>';
        return;
    }

    // Itera sobre os endereços e cria elementos HTML para cada um
    enderecos.forEach(endereco => {
        const addressElement = document.createElement('div');
        addressElement.classList.add('address-item');

        // Define valores padrão se as propriedades estiverem undefined
        const {
            titulo = '',
            rua = 'Rua não disponível',
            numero = 'Número não disponível',
            bairro = 'Bairro não disponível',
            cidade = 'Cidade não disponível',
            estado = 'Estado não disponível',
            principal = false,
            id
        } = endereco;

        // Verifica se é o endereço principal e altera o título se necessário
        const tituloDestaque = principal ? `<strong>${titulo} (Endereço Principal)</strong>` : titulo;

        addressElement.innerHTML = `
            <h5>${tituloDestaque}</h5>
            <p>${rua}, ${numero}, ${bairro}, ${cidade}, ${estado}</p>`;
        columnAddress.appendChild(addressElement);
    });
}