$('#cpf').mask('000.000.000-00');


const btnEntrar = document.getElementById("btnEntrar");
const cpf = document.getElementById("cpf");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmSenha = document.getElementById("confirmSenha");
const checkBox = document.getElementById("checkBox");






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

// Swal.fire({
//     position: "top-end",
//     title: 'Preencha todos os campos!',
//     showConfirmButton: false,
//     icon: 'error',
//     timer: 1500
// })