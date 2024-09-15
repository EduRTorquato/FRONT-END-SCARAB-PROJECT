getUserData();

const btnListarProduto = document.getElementById('btnListarProduto');
const btnListarUsuario = document.getElementById('btnListarUsuario');
const btnListarPedidos = document.getElementById('btnListarPedidos');

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



async function getUserData() {

    console.log(JSON.parse(sessionStorage.getItem("user")).email);

    const email = JSON.parse(sessionStorage.getItem("user")).email;

    const endpointMontado = `http://localhost:8080/usuarios/email/${email}`;

    console.log(endpointMontado);

    await fetch(endpointMontado).then(response => {
        if (response.ok) {

        }
        return response.json();
    }).then((data) => {

        console.log(data);



        if (data.grupo == "ESTOQUISTA") {
            console.log(data.grupo);
            //btnListarUsuario.addEventListener('click', avisaUsuario);
            btnListarUsuario.style.visibility = "hidden";
        } else {
            btnListarUsuario.addEventListener('click', redirectToUsuario);
        }


        sessionStorage.setItem("user", JSON.stringify(data));


    }).catch((error) => {
        console.error(error);
    });

}


async function deactivate(params) {
    console.log(params)
}

async function activate(params) {
    console.log(params);
    console.log("a")
}