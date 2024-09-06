$('#cpf').mask('000.000.000-00');


const btnEntrar = document.getElementById("btnEntrar");
const cpf = document.getElementById("cpf");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmSenha = document.getElementById("confirmSenha");
const checkBox = document.getElementById("checkBox");
const nomeUsuario = document.getElementById("nomeUsuario");

const verificarCpf = document.getElementById("verificarCpf");


//Validação email
email.addEventListener("keyup", function () {
    if (EmailValido(email.value)) {
        email.setAttribute("style", 'border: solid black')
    } else {
        email.setAttribute("style", 'border: solid red')
    }
})

//Verifica se senhas estão iguais
confirmSenha.addEventListener("mouseout", function () {
    if (senha.value != confirmSenha.value) {
        console.log("TÁ ERRADO");
        confirmSenha.setAttribute("style", 'border: solid red')
    } else {
        confirmSenha.setAttribute("style", 'border: solid black')
    }
})



//Verifica se CPF é válido.
verificarCpf.addEventListener("click", function () {

    if (validaCPF(cpf.value)) {
        Swal.fire({
            position: "center",
            title: 'CPF válido',
            showConfirmButton: false,
            icon: 'success',
            timer: 1500
        })
        btnEntrar.disabled = false;
        btnEntrar.classList.toggle('submitTrue');



    } else {
        Swal.fire({
            position: "center",
            title: 'CPF inválido',
            showConfirmButton: false,
            icon: 'warning',
            timer: 1500
        })

        btnEntrar.disabled = true;
    }
})



//Evento botão de entrar
btnEntrar.addEventListener("click", async (event) => {

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
    else if (!senha.value == confirmSenha.value || senha.value == "") {
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

        const cpf = document.getElementById("cpf").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const nomeUsuario = document.getElementById("nomeUsuario").value;

        const objCadastro = {
            cpf,
            email,
            senha,
            nomeUsuario
        }

        // Chamar a API para cadastrar o usuário
        await fetch("http://localhost:8080/usuarios", {
            method: "POST",
            body: JSON.stringify(objCadastro),
            headers: {
                "Content-Type": "application/json",
            },

        }).then(response => {

            console.log(objCadastro);

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

});



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