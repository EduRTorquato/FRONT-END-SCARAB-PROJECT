getUserData();

const btnListarProduto = document.getElementById('btnListarProduto');
const btnListarUsuario = document.getElementById('btnListarUsuario');
const btnListarPedidos = document.getElementById('btnListarPedidos');

const logout = document.getElementById("logout");

function redirectToProduto(event) {
    event.preventDefault();
    window.location.href = '../html/listar_produto.html'; // Redireciona para index.html
}

function redirectToUsuario(event) {
    event.preventDefault();
    window.location.href = '../html/listar_usuario.html'; // Redireciona para index.html
}

function redirectToPedido(event) {
    event.preventDefault();
    window.location.href = '../html/listar_pedido.html'; // Redireciona para index.html
}



// Adiciona eventos de clique aos links
btnListarProduto.addEventListener('click', redirectToProduto);
btnListarPedidos.addEventListener('click', redirectToPedido);





async function avisaUsuario() {
    Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Não permitido",
        showConfirmButton: false,
        timer: 1500
    });
}

logout.addEventListener("click", function(){
    sessionStorage.clear();
    window.location.href = "login.html";
})



async function getUserData() {

    (JSON.parse(sessionStorage.getItem("userBackOffice")).email);

    const email = JSON.parse(sessionStorage.getItem("userBackOffice")).email;

    const endpointMontado = `http://localhost:8080/usuarios/email/${email}`;

    (endpointMontado);

    await fetch(endpointMontado).then(response => {
        if (response.ok) {

        }
        return response.json();
    }).then((data) => {

        (data);



        if (data.grupo == "ESTOQUISTA") {
            (data.grupo);
            //btnListarUsuario.addEventListener('click', avisaUsuario);
            btnListarUsuario.style.visibility = "hidden";
        } else {
            btnListarUsuario.addEventListener('click', redirectToUsuario);
        }


        sessionStorage.setItem("userBackOffice", JSON.stringify(data));


    }).catch((error) => {
        console.error(error);
    });

}


async function deactivate(params) {
    (params)
}

async function activate(params) {
    (params);
    ("a")
}