
chamar();
$('#cpf').mask('000.000.000-00');


const user = JSON.parse(sessionStorage.getItem("user"))

console.log(user);

const cpfUser = document.getElementById("cpfUser");
const estoquistaUser = document.getElementById("estoquistaUser");



const btnSalvar = document.getElementById("btnSalvar");

const cpf = document.getElementById("cpf");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmSenha = document.getElementById("confirmSenha");
const nomeUsuario = document.getElementById("nomeUsuario");
const grupoUsuario = document.getElementById("grupoUsuario");


const addButton = document.getElementById("addButton");

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')



async function chamar() {
    // Chamar a API para carregar os usuários
    await fetch("http://localhost:8080/usuarios").then(response => {
        if (response.ok) {

        }
        return response.json();
    }).then((data) => {

        console.log(data);
        criarUsers(data);

    }).catch((error) => {
        console.error(error);
    });
}


btnSalvar.addEventListener("click", function () {
    salvar();
})

//Função que retorna validade do CPF
function validaCPF(cpf) {
    var Soma = 0
    var Resto

    var strCPF = String(cpf).replace(/[^\d]/g, '')

    if (strCPF.length !== 11)
        return false
    if ([
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
    ].indexOf(strCPF) !== -1)
        return false

    for (i = 1; i <= 9; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);

    Resto = (Soma * 10) % 11

    if ((Resto == 10) || (Resto == 11))
        Resto = 0

    if (Resto != parseInt(strCPF.substring(9, 10)))
        return false

    Soma = 0

    for (i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)

    Resto = (Soma * 10) % 11

    if ((Resto == 10) || (Resto == 11))
        Resto = 0

    if (Resto != parseInt(strCPF.substring(10, 11)))
        return false
    return true
}

function validaSenha() {
    if (senha.value == confirmSenha.value) {
        return true;
    } else {
        return false;
    }
}


//Verifica Validade do Email
function EmailValido(email) {
    if ((email == null) || (email.length < 4))
        return false;

    var partes = email.split('@');
    if (partes.length < 2) return false;

    var pre = partes[0];
    if (pre.length == 0) return false;

    if (!/^[a-zA-Z0-9_.-/+]+$/.test(pre))
        return false;

    // gmail.com, outlook.com, terra.com.br, etc.
    var partesDoDominio = partes[1].split('.');
    if (partesDoDominio.length < 2) return false;

    for (var indice = 0; indice < partesDoDominio.length; indice++) {
        var parteDoDominio = partesDoDominio[indice];

        // Evitando @gmail...com
        if (parteDoDominio.length == 0) return false;

        if (!/^[a-zA-Z0-9-]+$/.test(parteDoDominio))
            return false;
    }

    return true;
}

async function salvar() {

    if (!validaCPF(cpf.value)) {
        Swal.fire({
            position: "center",
            title: 'Valide o CPF antes de se cadastrar.',
            showConfirmButton: false,
            icon: 'warning',
            timer: 1500
        })
    }
    else if (nomeUsuario.value == "") {
        Swal.fire({
            position: "center",
            title: 'Preencha o nome de usuário.',
            showConfirmButton: false,
            icon: 'warning',
            timer: 2000
        })
    }
    else if (!validaSenha() || senha.value == "") {
        Swal.fire({
            position: "center",
            title: 'Senhas não preenchidas ou não coincidem.',
            showConfirmButton: false,
            icon: 'warning',
            timer: 2000
        })
    } else if (!EmailValido(email.value) || email.value == "") {
        Swal.fire({
            position: "center",
            title: 'Emaiil não está correto!',
            showConfirmButton: false,
            icon: 'warning',
            timer: 1500
        })
    } else {

        const objSalvar = {
            "cpf": cpf.value,
            "nomeUsuario": nomeUsuario.value,
            "email": email.value,
            "senha": senha.value,
            "grupo": grupoUsuario.value
        }


        // Chamar a API para cadastrar o usuário
        await fetch("http://localhost:8080/usuarios", {
            method: "POST",
            body: JSON.stringify(objSalvar),
            headers: {
                "Content-Type": "application/json",
            },

        }).then(response => {

            if (response.status != 202) {
                throw new Error("Verifique os dados");
            } else {
                Swal.fire({
                    position: "center",
                    title: "Usuário cadastrado com sucesso",
                    showConfirmButton: false,
                    icon: 'success',
                    timer: 1500
                })

                setTimeout(function () {
                    location.reload();
                }, 2000);


            }
            return response.text();
        }).catch((error) => {

            console.log(error);
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "Verifique os dados novamente!",
                showConfirmButton: false,
                timer: 1500
            });
        });

    }
}


async function deactivate(objetoDesativar) {

    const objetoDesativarBody = {
        "cpf": objetoDesativar.cpf,
        "nomeUsuario": objetoDesativar.nomeUsuario,
        "email": objetoDesativar.email,
        "grupo": objetoDesativar.grupo
    }


    await fetch("http://localhost:8080/usuarios/desativar", {
        method: "PUT",
        body: JSON.stringify(objetoDesativarBody),
        headers: {
            "Content-Type": "application/json",
        },

    }).then(response => {
        if (response.status != 202) {
            throw new Error("Verifique os dados");
        } else {

            console.log("OBJETO DESATIVADO")
            console.log(objetoDesativarBody)

            Swal.fire({
                position: "center",
                title: "Usuário desativado na base de dados!",
                showConfirmButton: false,
                icon: 'success',
                timer: 1500
            })

            setTimeout(function () {
                location.reload();
            }, 2000);

        }
        return response.text();
    }).catch((error) => {

        console.log(error);
        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Verifique os dados novamente!",
            showConfirmButton: false,
            timer: 1500
        });
    });
}

async function activate(objetoAtivar) {
    const objetoAtivarBody = {
        "cpf": objetoAtivar.cpf,
        "nomeUsuario": objetoAtivar.nomeUsuario,
        "email": objetoAtivar.email,
        "grupo": objetoAtivar.grupo
    }


    await fetch("http://localhost:8080/usuarios/ativar", {
        method: "PUT",
        body: JSON.stringify(objetoAtivarBody),
        headers: {
            "Content-Type": "application/json",
        },

    }).then(response => {
        if (response.status != 202) {
            throw new Error("Verifique os dados");
        } else {

            console.log("OBJETO DESATIVADO")
            console.log(objetoAtivarBody)

            Swal.fire({
                position: "center",
                title: "Usuário ativo na base de dados!",
                showConfirmButton: false,
                icon: 'success',
                timer: 1500
            })

            setTimeout(function () {
                location.reload();
            }, 2000);

        }
        return response.text();
    }).catch((error) => {

        console.log(error);
        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Verifique os dados novamente!",
            showConfirmButton: false,
            timer: 1500
        });
    });
}


var listUser = document.getElementById("listUser");

function criarUsers(dados) {
    dados.forEach(function (dado) {

        var divUser = document.createElement("div");

        var idUser = document.createElement("p");
        var emailUser = document.createElement("p");
        var nameUser = document.createElement("p");
        var cpfUser = document.createElement("p");
        var tipoUser = document.createElement("p");
        var ativo = document.createElement("p");

        var buttonActive = document.createElement("button");
        var buttonDeactivate = document.createElement("button");


        buttonActive.onclick = function () { activate(dado) }
        buttonDeactivate.onclick = function () { deactivate(dado) }

        divUser.classList.add("userUnique");
        buttonActive.classList.add("ativar");
        buttonDeactivate.classList.add("desativar");


        listUser.appendChild(divUser);
        divUser.appendChild(idUser);
        divUser.appendChild(emailUser);
        divUser.appendChild(nameUser);
        divUser.appendChild(cpfUser);
        divUser.appendChild(tipoUser);
        divUser.appendChild(ativo);


        divUser.appendChild(buttonActive);
        divUser.appendChild(buttonDeactivate);



        buttonActive.innerHTML = "ATIVAR";
        buttonDeactivate.innerHTML = "INATIVAR";

        user.nomeUsuario == dado.nomeUsuario ? buttonActive.disabled = true : buttonActive.disabled = false;
        user.nomeUsuario == dado.nomeUsuario ? buttonDeactivate.disabled = true : buttonDeactivate.disabled = false;

        user.nomeUsuario == dado.nomeUsuario ? buttonActive.classList.add("inativo") : buttonActive.disabled = false;
        user.nomeUsuario == dado.nomeUsuario ? buttonDeactivate.classList.add("inativo") : buttonActive.disabled = false;




        idUser.innerHTML = dado.id;
        emailUser.innerHTML = dado.email;
        nameUser.innerHTML = dado.nomeUsuario;
        cpfUser.innerHTML = dado.cpf;
        tipoUser.innerHTML = dado.grupo;

        dado.active == 1 ? ativo.innerHTML = "Ativo" : ativo.innerHTML = "Inativo";

    });





}