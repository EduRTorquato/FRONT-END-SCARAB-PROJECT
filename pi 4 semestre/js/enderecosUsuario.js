
const user = JSON.parse(sessionStorage.getItem("user"));

findById(user.id);




//FUNÇÃO QUE DESATIVA PRODUTO
async function findById(objetoDesativar) {

    const endpointMontado = `http://localhost:8080/endereco/${objetoDesativar}`;

    await fetch(endpointMontado).then(response => {
        if (response.ok) {

        }
        return response.json();
    }).then((dado) => {

        console.log(dado);
            
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