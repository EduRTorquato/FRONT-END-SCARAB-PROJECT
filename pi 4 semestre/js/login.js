const register = document.getElementById("register");
const btnEntrar = document.getElementById("btnEntrar");


register.addEventListener("click", () => {
    window.location.href = "cadastro.html";
})

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

        console.log(usuario);
        // Chamar a API para fazer login
        fetch("http://localhost:8080/usuarios/login", {
            method: "POST",
            body: JSON.stringify(usuario),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                console.log(response.status);
                if (response.status   == 400) {
                    throw new Error(JSON.stringify("Usuário ou senha incorretos."));;
                }else if(response.status == 423){
                    throw new Error(JSON.stringify("Usuário não ativo no banco de dados."));;
                }
                return response.text();
            })
            .then(data => {
                // Redirecionar para outra página após o login bem-sucedido
                sessionStorage.setItem("user", JSON.stringify(usuario));
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