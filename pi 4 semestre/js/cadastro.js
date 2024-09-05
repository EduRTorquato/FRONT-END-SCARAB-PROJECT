$('#cpf').mask('000.000.000-00');


const btnEntrar = document.getElementById("btnEntrar");
const cpf = document.getElementById("cpf");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmSenha = document.getElementById("confirmSenha");
const checkBox = document.getElementById("checkBox");

const verificarCpf = document.getElementById("verificarCpf");




email.addEventListener("keyup", function () {
    if (EmailValido(email.value)) {
        email.setAttribute("style", 'border: solid red')
    } else {
    
    }
})

confirmSenha.addEventListener("mouseout", function () {
    if (senha.value != confirmSenha.value) {
        console.log("TÁ ERRADO");
        confirmSenha.setAttribute("style", 'border: solid red')
    } else {
        confirmSenha.setAttribute("style", 'border: solid black')
    }
})

verificarCpf.addEventListener("click", function () {

    if (validaCPF(cpf.value)) {
        Swal.fire({
            position: "center",
            title: 'CPF válido',
            showConfirmButton: false,
            icon: 'success',
            timer: 1500
        })
    } else {
        Swal.fire({
            position: "center",
            title: 'CPF inválido',
            showConfirmButton: false,
            icon: 'warning',
            timer: 1500
        })
    }
})


btnEntrar.addEventListener("click", function () {
    console.log("Hello!");



    console.log({
        cpf: cpf.value,
        email: email.value,
        senha: senha.value,
        confirmSenha: confirmSenha.value,
        checkBox: checkBox.value
    })

});



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

function EmailValido(email) {
    if ((email == null) || (email.length < 4))
    return false;

    var partes = email.split('@');
    if (partes.length < 2 ) return false;

    var pre = partes[0];
    if (pre.length == 0) return false;
    
    if (!/^[a-zA-Z0-9_.-/+]+$/.test(pre))
        return false;

    // gmail.com, outlook.com, terra.com.br, etc.
    var partesDoDominio = partes[1].split('.');
    if (partesDoDominio.length < 2 ) return false;

    for ( var indice = 0; indice < partesDoDominio.length; indice++ )
    {
        var parteDoDominio = partesDoDominio[indice];

        // Evitando @gmail...com
        if (parteDoDominio.length == 0) return false;  

        if (!/^[a-zA-Z0-9-]+$/.test(parteDoDominio))
            return false;
    }

    return true;
}
// Swal.fire({
//     position: "top-end",
//     title: 'Preencha todos os campos!',
//     showConfirmButton: false,
//     icon: 'error',
//     timer: 1500
// })