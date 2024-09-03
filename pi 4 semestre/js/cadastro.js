const btnEntrar = document.getElementById("btnEntrar");


btnEntrar.addEventListener("click", function () {
    console.log("Hello!");
    Swal.fire({
        position: "top-end",
        title: 'Preencha todos os campos!',
        showConfirmButton: false,
        icon: 'error',
        timer: 1500
    })
});