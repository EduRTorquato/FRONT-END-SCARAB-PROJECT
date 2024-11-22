// Recupera o usuário do sessionStorage
const user = JSON.parse(sessionStorage.getItem("user"));
const id_sair = document.getElementById("id_sair");
const idTable = document.getElementById("idTable");



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
    const endpoint = `http://localhost:8080/endereco/cliente/${userId}`;

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



    // Itera sobre os endereços e cria elementos HTML para cada um
    enderecos.forEach(endereco => {

        var tbody = document.createElement("tbody");
        var rowTable = document.createElement("tr");
        var tdBairro = document.createElement("td");
        var tdRua = document.createElement("td");
        var tdNumero = document.createElement("td");
        var tdCep = document.createElement("td");
        var tdCidade = document.createElement("td");
        var tdPrincipal = document.createElement("td");


        idTable.appendChild(tbody);
        tbody.appendChild(rowTable);
        rowTable.appendChild(tdBairro);
        rowTable.appendChild(tdRua);
        rowTable.appendChild(tdNumero);
        rowTable.appendChild(tdCep);
        rowTable.appendChild(tdCidade);
        rowTable.appendChild(tdPrincipal);


        tdBairro.innerHTML = endereco.bairro;
        tdRua.innerHTML = endereco.rua;
        tdNumero.innerHTML = endereco.numero;
        tdCep.innerHTML = endereco.cep;
        tdCidade.innerHTML = endereco.cidade;
        endereco.principal ? tdPrincipal.innerHTML = "Sim" : tdPrincipal.innerHTML = "Não";

    });
}