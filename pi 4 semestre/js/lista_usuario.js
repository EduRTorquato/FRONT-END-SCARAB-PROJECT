$('#cpf').mask('000.000.000-00');

chamar();

//BUSCA DADOS DO USUÁRIO LOGADO
const user = JSON.parse(sessionStorage.getItem("user"))

//BOOLEANO PARA VALIDAR EDIÇÃO.
var editar = new Boolean(false);

//OBJETO GLOBAL PARA EDIÇÃO DE OBJETO.
var objetoEditar;

//CAMPOS DE INSERÇÃO DE DADOS
const cpf = document.getElementById("cpf");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmSenha = document.getElementById("confirmSenha");
const nomeUsuario = document.getElementById("nomeUsuario");
const grupoUsuario = document.getElementById("grupoUsuario");
const myModal = document.getElementById('myModal');
const myInput = document.getElementById('myInput');
const nomeBusca = document.getElementById('nomeBusca');
const userAtivo = document.getElementById("userAtivo");
const títuloModal = document.getElementById('títuloModal');

// ID DE BOTÕES
const realizaBusca = document.getElementById('realizaBusca');
const btnSalvar = document.getElementById("btnSalvar");
const addButton = document.getElementById("addButton");

//MODAL
const modalUser = new bootstrap.Modal(document.getElementById('modalUser'));

realizaBusca.addEventListener("click", () => {
    buscaPorNome();
})

//FUNÇÃO DO BOTÃO DE SALVAR USUÁRIO NO MODAL.
btnSalvar.addEventListener("click", function () {
    salvar();
})

//LIMPA CAMPOS AO ABRIR O MODAL DE ADIÇÃO
addButton.addEventListener("click", function () {
    cpf.value = " "
    email.value = " "
    nomeUsuario.value = " "

    títuloModal.innerHTML = "Cadastro de Usuário";
})


//ENDPOINT PARA BUSCAR LISTA DE USUÁRIOS.
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


//FUNÇÃO QUE DESATIVA USUÁRIO
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



//FUNÇÃO QUE ATIVA USUÁRIO.
async function activate(objetoAtivar) {
    const objetoAtivarBody = {
        "cpf": objetoAtivar.cpf,
        "nomeUsuario": objetoAtivar.nomeUsuario,
        "email": objetoAtivar.email,
        "grupo": objetoAtivar.grupo
    }


    //CHAMA O ENDPOINT DE PUT
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

        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Verifique os dados novamente!",
            showConfirmButton: false,
            timer: 1500
        });
    });
}



//MONTA USUÁRIOS NA LISTA
function criarUsers(dados) {
    var listUser = document.getElementById("listUser");

    dados.forEach(function (dado) {

        var divUser = document.createElement("div");

        var idUser = document.createElement("p");
        var emailUser = document.createElement("p");
        var nameUser = document.createElement("p");
        var cpfUser = document.createElement("p");
        var tipoUser = document.createElement("p");
        var ativo = document.createElement("p");


        var buttonEditUser = document.createElement("button");
        var buttonActive = document.createElement("button");
        var buttonDeactivate = document.createElement("button");


        buttonActive.onclick = function () { activate(dado) }
        buttonDeactivate.onclick = function () { deactivate(dado) }

        buttonEditUser.onclick = function () {
            //PREPARA CAMPOS PARA EDIÇÃO DE USUÁRIO.
            editar = true;
            email.value = dado.email;
            cpf.value = dado.cpf
            nomeUsuario.value = dado.nomeUsuario;
            grupoUsuario.value = dado.grupo;
            userAtivo.value = dado.active;

            //MONTA OBJETO COM CAMPOS QUE SERÃO UTILIZADOS NAS TRANSAÇÕES DE DADOS.
            var objEditar = {
                "id": dado.id,
                "cpf": dado.cpf,
                "nomeUsuario": dado.nomeUsuario,
                "email": dado.email,
                "senha": dado.senha,
                "active": dado.active,
                "grupo": dado.grupo
            }

            títuloModal.innerHTML = 'Editar';

            //ATRIBUI VARIÁVEL GLOBAL DE DADOS.
            objetoEditar = objEditar;

            //ABRE MODAL
            modalUser.show();
        }

        //MONTA O HTML DA LISTAGEM.
        divUser.classList.add("userUnique");
        buttonActive.classList.add("ativar");
        buttonDeactivate.classList.add("desativar");
        buttonEditUser.classList.add("edit");


        listUser.appendChild(divUser);
        divUser.appendChild(idUser);
        divUser.appendChild(emailUser);
        divUser.appendChild(nameUser);
        divUser.appendChild(cpfUser);
        divUser.appendChild(tipoUser);
        divUser.appendChild(ativo);


        divUser.appendChild(buttonEditUser);
        divUser.appendChild(buttonActive);
        divUser.appendChild(buttonDeactivate);



        buttonActive.innerHTML = "ATIVAR";
        buttonDeactivate.innerHTML = "INATIVAR";
        buttonEditUser.innerHTML = "EDITAR";



        //VALIDA SE O CAMPO É IGUAL AO DO USUÁRIO ATUAL.
        user.nomeUsuario == dado.nomeUsuario ? buttonActive.disabled = true : buttonActive.disabled = false;
        user.nomeUsuario == dado.nomeUsuario ? buttonDeactivate.disabled = true : buttonDeactivate.disabled = false;
        user.nomeUsuario == dado.nomeUsuario ? buttonEditUser.disabled = true : buttonEditUser.disabled = false;

        user.nomeUsuario == dado.nomeUsuario ? buttonActive.classList.add("inativo") : buttonActive.disabled = false;
        user.nomeUsuario == dado.nomeUsuario ? buttonDeactivate.classList.add("inativo") : buttonActive.disabled = false;
        user.nomeUsuario == dado.nomeUsuario ? buttonEditUser.classList.add("inativo") : buttonEditUser.disabled = false;


        //SETA CADA CAMPO INDIVIDUALMENTE
        idUser.innerHTML = dado.id;
        emailUser.innerHTML = dado.email;
        nameUser.innerHTML = dado.nomeUsuario;
        cpfUser.innerHTML = dado.cpf;
        tipoUser.innerHTML = dado.grupo;

        //VALIDAÇÃO PARA MOSTRAR EM TEXTO O VALOR DE 0 OU 1
        dado.active == 1 ? ativo.innerHTML = "Ativo" : ativo.innerHTML = "Inativo";

    });
}


//SALVA USUÁRIO NO BANCO DE DADOS, E VERIFICA SE É UPDATE OU POST
async function salvar() {
    //VALIDAÇÃO DE CADA UM DOS CAMPOS
    if (!validaCPF(cpf.value) && !editar) {
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

        //EDIÇÃO DE USUÁRIO (VERIFICA A FLAG DE EDITAR).
        if (editar) {
            const objSalvar = {
                "id": objetoEditar.id,
                "cpf": cpf.value,
                "nomeUsuario": nomeUsuario.value,
                "email": email.value,
                "senha": senha.value,
                "grupo": grupoUsuario.value,
                "active": objetoEditar.value
            }


            // Chamar a API para atualização do usuário
            await fetch("http://localhost:8080/usuarios", {
                method: "PUT",
                body: JSON.stringify(objSalvar),
                headers: {
                    "Content-Type": "application/json",
                },

            }).then(response => {
                console.log(response.status);

                if (response.status != 202) {
                    throw new Error("Verifique os dados");
                } else {
                    Swal.fire({
                        position: "center",
                        title: "Usuário alterado com sucesso",
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
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: "Verifique os dados novamente!",
                    showConfirmButton: false,
                    timer: 1500
                });
            });

        } else {

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
}

async function buscaPorNome() {
    const nome = nomeBusca.value;

    const endpointMontado = `http://localhost:8080/usuarios/usuario/${nome}`;

    console.log(endpointMontado);

    await fetch(endpointMontado).then(response => {
        if (response.ok) {

        }
        return response.json();
    }).then((dado) => {

        console.log(dado);

         //PREPARA CAMPOS PARA EDIÇÃO DE USUÁRIO.
         editar = true;
         email.value = dado.email;
         cpf.value = dado.cpf
         nomeUsuario.value = dado.nomeUsuario;
         grupoUsuario.value = dado.grupo;
         userAtivo.value = dado.active;

         títuloModal.innerHTML = dado.nomeUsuario;

         //ABRE MODAL
         modalUser.show();

    }).catch((error) => {
        console.error(error);

        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Usuário não encontrado.",
            showConfirmButton: false,
            timer: 1500
        });
    });

}


