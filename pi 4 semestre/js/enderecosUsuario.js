// Recupera o usuário do sessionStorage
const user = JSON.parse(sessionStorage.getItem("user"));

// **Adicionar o evento de clique ao elemento "Meus Dados"**
document.querySelectorAll('.linkList').forEach(link => {
    if (link.textContent.trim() === "Meus Dados") {
        link.addEventListener("click", function() {
            window.location.href = "perfilUsuario.html"; // Redireciona para a página de perfil do usuário
        });
    }
});

if (user && user.id) {
    // Busca os dados do usuário e os endereços
    fetchUserData(user.id);
    findById(user.id);
}

// Função que busca os dados do usuário
async function fetchUserData(userId) {
    const endpoint = `http://localhost:8080/usuario/${userId}`; // Ajuste o endpoint conforme necessário

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const userData = await response.json();

        // Atualiza o nome e o email no HTML
        document.getElementById('nome_id').textContent = userData.nome; // Ajuste a propriedade conforme seu retorno
        document.getElementById('email_id').textContent = userData.email; // Ajuste a propriedade conforme seu retorno
    } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Erro ao carregar dados do usuário.",
            showConfirmButton: false,
            timer: 1500
        });
    }
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
            <p>${rua}, ${numero}, ${bairro}, ${cidade}, ${estado}</p>
            <button class="btn-excluir" onclick="excluirEndereco(${id})">Excluir</button>
        `;
        columnAddress.appendChild(addressElement);
    });
}

// Função de exclusão de endereço
async function excluirEndereco(enderecoId) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const endpoint = `http://localhost:8080/endereco/${enderecoId}`;

    if (!user || !user.id) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Usuário não está autenticado.',
        });
        return;
    }

    try {
        const response = await fetch(endpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}` // Se necessário, adicione o token de autenticação
            }
        });

        // Adicione um log para verificar a resposta
        console.log("Resposta do servidor ao excluir endereço:", response);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erro ao excluir o endereço");
        }

        Swal.fire({
            icon: 'success',
            title: 'Endereço excluído com sucesso!',
            showConfirmButton: false,
            timer: 1500
        });

        // Atualiza a lista de endereços
        findById(user.id); // Recarrega os endereços após exclusão
    } catch (error) {
        console.error("Erro ao excluir endereço:", error);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Não foi possível excluir o endereço.',
        });
    }
}
