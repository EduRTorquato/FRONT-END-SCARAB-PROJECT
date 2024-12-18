
const btnEntrar = document.getElementById("btnEntrar");

// ======================= LOGIN ======================= \\ 
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
        fetch("http://localhost:8080/usuarios/login", {
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
                } else if (response.status == 423) {
                    throw new Error(JSON.stringify("Usuário não ativo no banco de dados."));;
                }
                else if (response.status == 500) {
                    throw new Error(JSON.stringify("Dados não corretos"));;
                }
                return response.text();
            })
            .then(data => {
                // Redirecionar para outra página após o login bem-sucedido
                sessionStorage.setItem("userBackOffice", JSON.stringify(usuario));
                window.location.href = "listar.html";
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