$(document).ready(function () {

    $('#cpf').mask('000.000.000-00');
})


cadastrar = document.getElementById("cadastrar");

nome = document.getElementById("nome");
emailCadastro = document.getElementById("emailCadastro");
cpf = document.getElementById("cpf");
genero = document.getElementById("genero");
dataNasc = document.getElementById("dataNasc");
senhaCadastro = document.getElementById("senhaCadastro");
confirmSenha = document.getElementById("confirmSenha");
const finishingOrder = sessionStorage.getItem("finishingOrder");

cadastrar.addEventListener("click", function () {
    // Criar um objeto com os dados do usuário
    const usuarioCadastro = {
        "nome": nome.value,
        "genero": genero.value,
        "cpf": cpf.value,
        "dataNasc": dataNasc.value,
        "email": emailCadastro.value,
        "senha": senhaCadastro.value,
    };

    if (!validaCPF(cpf.value))  {
        Swal.fire({
            position: "center",
            title: 'Valide o CPF antes de se cadastrar.',
            showConfirmButton: false,
            icon: 'warning',
            timer: 1500
        })
    }
    else if (nome.value == ""){
        Swal.fire({
            position: "center",
            title: 'Preencha o nome de usuário.',
            showConfirmButton: false,
            icon: 'warning',
            timer: 2000
        })
    }
    else if (!validaSenha() || senhaCadastro.value == "") {
        Swal.fire({
            position: "center",
            title: 'Senhas não preenchidas ou não coincidem.',
            showConfirmButton: false,
            icon: 'warning',
            timer: 2000
        })
    } else if (emailCadastro.value == "") {
        Swal.fire({
            position: "center",
            title: 'Emaiil não está correto!',
            showConfirmButton: false,
            icon: 'warning',
            timer: 1500
        })
    } else {
        //     //Chamar a API para fazer login
        fetch("http://localhost:8080/cliente", {
            method: "POST",
            body: JSON.stringify(usuarioCadastro),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                (response.status);
                if (response.status == 400) {
                    throw new Error(JSON.stringify("Problema durante o cadastro do usuário"));;
                }
                else if (response.status == 500) {
                    throw new Error(JSON.stringify("Dados não corretos"));;
                } else if (validaSenha()) {

                    Swal.fire({
                        position: "top-end",
                        icon: "warning",
                        title: "Senhas não coincidem",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                return response.text();
            })
            .then(data => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Tudo Certo",
                    showConfirmButton: false,
                    timer: 1500
                });

                document.getElementById("reg-log").checked = false;
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: error,
                    showConfirmButton: false,
                    timer: 1500
                });
            });

    }
})


btnEntrar.addEventListener("click", (event) => {
    event.preventDefault();

    // Obter os valores dos campos
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;


    // Criar um objeto com os dados do usuário
    const usuario = {
        "email": email,
        "senha": senha,
    };

    if (usuario.email == '' || usuario.senha == '') {
        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Preencha os campos",
            showConfirmButton: false,
            timer: 1500
        });

    } else {

        // Chamar a API para fazer login
        fetch("http://localhost:8080/cliente/login", {
            method: "POST",
            body: JSON.stringify(usuario),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (response.status == 400) {
                    throw new Error(JSON.stringify("Usuário ou senha incorretos."));;
                }
                else if (response.status == 500) {
                    throw new Error(JSON.stringify("Dados não corretos"));;
                }
                return response.text();
            })
            .then(data => {
                // Redirecionar para outra página após o login bem-sucedido
                sessionStorage.setItem("client", JSON.stringify(usuario));

                if (finishingOrder == true) {
                    window.location.href = "finalizarPedidos.html";
                } else {
                    window.location.href = "home.html";
                }
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: error,
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    }
});

function validaSenha() {
    if (senhaCadastro.value == confirmSenha.value) {
        return true;
    } else {
        return false;
    }
}


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



