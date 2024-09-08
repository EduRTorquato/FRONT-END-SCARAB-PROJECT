
chamar();

const nomeUser = document.getElementById("nomeUser");
const cpfUser = document.getElementById("cpfUser");
const estoquistaUser = document.getElementById("estoquistaUser");




async function chamar() {
    // Chamar a API para cadastrar o usuário
    await fetch("http://localhost:8080/usuarios").then(response => {
        if (response.ok) {

        }
        return response.json();
    }).then((data) => {

        console.log(data);
        criarUsers(data);

        if (data.length == 0) {
            //no_vehicle.innerText = "Aguarde, estamos adicionando novos veículos!";
        }

        // carros = data;
        // criaCards(carros);


    }).catch((error) => {
        console.error(error);
    });
}

async function deactivate(objetoDesativar) {


    const objetoDesativarBody = {
        "cpf": objetoDesativar.cpf,
        "nomeUsuario": objetoDesativar.nomeUsuario,
        "email": objetoDesativar.email,
        "grupo": objetoDesativar.grupo
    }


    await fetch("http://localhost:8080/usuarios/desativar", {
        method: "PUT",
        body: JSON.stringify(objetoDesativarBody),
        headers: {
            "Content-Type": "application/json",
        },

    }).then(response => {
        if (response.status != 202) {
            throw new Error("Verifique os dados");
        } else {

            console.log("OBJETO DESATIVADO")
            console.log(objetoDesativarBody)

            Swal.fire({
                position: "center",
                title: "Usuário desativado na base de dados!",
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

async function activate(objetoAtivar) {

    const objetoAtivarBody = {
        "cpf": objetoAtivar.cpf,
        "nomeUsuario": objetoAtivar.nomeUsuario,
        "email": objetoAtivar.email,
        "grupo": objetoAtivar.grupo
    }


    await fetch("http://localhost:8080/usuarios/ativar", {
        method: "PUT",
        body: JSON.stringify(objetoAtivarBody),
        headers: {
            "Content-Type": "application/json",
        },

    }).then(response => {
        if (response.status != 202) {
            throw new Error("Verifique os dados");
        } else {

            console.log("OBJETO DESATIVADO")
            console.log(objetoAtivarBody)

            Swal.fire({
                position: "center",
                title: "Usuário ativo na base de dados!",
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


var listUser = document.getElementById("listUser");

function criarUsers(dados) {



    dados.forEach(function (dado) {



        var divUser = document.createElement("div");
        var nameUser = document.createElement("p");
        var cpfUser = document.createElement("p");
        var tipoUser = document.createElement("p");

        var buttonActive = document.createElement("button");
        var buttonDeactivate = document.createElement("button");


        buttonActive.onclick = function () { activate(dado) }
        buttonDeactivate.onclick = function () { deactivate(dado) }

        divUser.classList.add("userUnique");
        buttonActive.classList.add("ativar");
        buttonDeactivate.classList.add("desativar");


        listUser.appendChild(divUser);
        divUser.appendChild(nameUser);
        divUser.appendChild(cpfUser);
        divUser.appendChild(tipoUser);

        divUser.appendChild(buttonActive);
        divUser.appendChild(buttonDeactivate);



        buttonActive.innerHTML = "ATIVAR";
        buttonDeactivate.innerHTML = "INATIVAR";



        nameUser.innerHTML = dado.nomeUsuario;
        cpfUser.innerHTML = dado.cpf;
        tipoUser.innerHTML = dado.grupo;




    });
}