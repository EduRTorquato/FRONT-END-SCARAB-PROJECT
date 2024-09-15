export var dadosUsuario;

export async function buscaPorNome(nome) {    // Chamar a API para carregar os usuários


    await fetch("http://localhost:8080/usuarios/admin1").then(response => {
        if (response.ok) {

        }
        return response.json();
    }).then((data) => {

        dadosUsuario = data;

    }).catch((error) => {
        console.error(error);
    });


    return dadosUsuario;

}