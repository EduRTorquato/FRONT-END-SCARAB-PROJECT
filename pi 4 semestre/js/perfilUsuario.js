//LOGOUT
const id_sair = document.getElementById("id_sair");

//DADOS ENDEREÇO
const cep_id = document.getElementById("cep_id");
const endereco_id = document.getElementById("endereco_id");
const cidade_id = document.getElementById("cidade_id");
const complemento_id = document.getElementById("complemento_id");
const inputState = document.getElementById("inputState");
const numero_id = document.getElementById("numero_id");
const bairro_id = document.getElementById("bairro_id");
const principal_id = document.getElementById("principal_id");

const finishingOrder = sessionStorage.getItem("finishingOrder");
console.log(finishingOrder);


//NOME E EMAIL
const nome_id = document.getElementById("nome_id");
const email_id = document.getElementById("email_id");


//DADOS USUÁRIOS
const nomeCompleto_id = document.getElementById("nomeCompleto_id");
const emailDado_id = document.getElementById("emailDado_id");
const genero_id = document.getElementById("genero_id");
const cpf_id = document.getElementById("cpf_id");
const dataNascimento_id = document.getElementById("dataNascimento_id");



//FORMATAÇÃO DAS DATAS
function formatDate(dataNascimento) {
    var data = new Date(dataNascimento.split('.')[0]);

    // Extrair o ano, mês e dia
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
    const dia = String(data.getDate()).padStart(2, '0');

    var novaData = `${ano}-${mes}-${dia}`;
    return novaData;
}

//LOGOUT
id_sair.addEventListener("click", function () {
    window.location.href = "loginUsuario.html";
    sessionStorage.clear();
})

//ICONES 
const saveData = document.getElementById("saveData");

//NOME
nome_id.innerHTML = JSON.parse(sessionStorage.getItem("user")).nome;
email_id.innerHTML = JSON.parse(sessionStorage.getItem("user")).email;

//DADOS INPUT
nomeCompleto_id.value = JSON.parse(sessionStorage.getItem("user")).nome;
emailDado_id.value = JSON.parse(sessionStorage.getItem("user")).email;
genero_id.value = JSON.parse(sessionStorage.getItem("user")).genero;
cpf_id.value = JSON.parse(sessionStorage.getItem("user")).cpf;
dataNascimento_id.value = formatDate(JSON.parse(sessionStorage.getItem("user")).dataNasc);

cep_id.addEventListener('blur', function () {
    consultaCep();
})

async function salvaDados() {
    const objetoAddress = {
        "numero": numero_id.value,
        "complemento": complemento_id.value,
        "cep": cep_id.value,
        "bairro": bairro_id.value,
        "cidade": cidade_id.value,
        "uf": inputState.value,
        "principal": principal_id.checked,
        "clienteId": 1,
        "rua": endereco_id.value
    }

    console.log(objetoAddress);

}

async function consultaCep() {
    // Chamar a API para carregar os produtos
    var cep = '04776100';

    await fetch(`https://viacep.com.br/ws/${cep_id.value}/json/`).then(response => {
        if (response.ok) {

        }
        return response.json();
    }).then((data) => {
        console.log(data);
        endereco_id.value = data.logradouro;
        cidade_id.value = data.localidade;
        inputState.value = data.uf;
        bairro_id.value = data.bairro;

    }).catch((error) => {
        console.error(error);
    });
}

saveData.addEventListener("click", function () {

    const objetoAddress = {
        "numero": numero_id.value,
        "complemento": complemento_id.value,
        "cep": cep_id.value,
        "bairro": bairro_id.value,
        "cidade": cidade_id.value,
        "uf": inputState.value,
        "principal": principal_id.checked,
        "rua": endereco_id.value,
        "clienteId": JSON.parse(sessionStorage.getItem("user")).id
    }

    console.log(objetoAddress);


    // Chamar a API para cadastrar o endereço
    fetch("http://localhost:8080/endereco", {
        method: "POST",
        body: JSON.stringify(objetoAddress),
        headers: {
            "Content-Type": "application/json",
        },

    }).then(response => {

        if (response.status != 202) {
            throw new Error("Verifique os dados");
        } else {
            Swal.fire({
                position: "center",
                title: "Endereço cadastrado com sucesso",
                showConfirmButton: false,
                icon: 'success',
                timer: 1500
            })

            if (finishingOrder) {
                Swal.fire({
                    title: "Endereço Cadastrado",
                    text: "Deseja retornar para finalizar a compra?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Retornar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "finalizarPedidos.html"
                    }
                });
            } else {
                setTimeout(function () {
                    location.reload();
                }, 1000);
            }






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
