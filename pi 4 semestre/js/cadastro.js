// ======================= LOGIN CLIENTE ======================= \\ 

cadastrar = document.getElementById("cadastrar");

nome = document.getElementById("nome");
emailCadastro = document.getElementById("emailCadastro");
cpf = document.getElementById("cpf");
genero = document.getElementById("genero");
dataNasc = document.getElementById("dataNasc");
senhaCadastro = document.getElementById("senhaCadastro");
confirmSenha = document.getElementById("confirmSenha");


cadastrar.addEventListener("click", function () {

    console.log(nome.value);
    console.log(emailCadastro.value);
    console.log(cpf.value);
    console.log(dataNasc.value);
    console.log(genero.value);


    // Criar um objeto com os dados do usuário
    const usuarioCadastro = {
        "nome": nome.value,
        "genero": genero.value,
        "cpf": cpf.value,
        "dataNasc": dataNasc.value,
        "email": emailCadastro.value,
        "senha": senhaCadastro.value,
    };

    console.log(usuarioCadastro);

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
            }
            return response.text();
        })
        .then(data => {
            console.log(data);
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

    console.log(usuario);

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
                (response.status);
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
                window.location.href = "home.html";
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

