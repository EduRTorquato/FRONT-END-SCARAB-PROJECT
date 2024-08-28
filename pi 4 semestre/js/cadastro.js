document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.forms1');

    form.addEventListener('submit', function(event) {
        if (!validateForm()) {
            event.preventDefault(); // Impede o envio do formulário
            alert('Preencha todos os campos corretamente.');
        } else {
            event.preventDefault(); // Impede o envio do formulário
            window.location.href = '../index.html'; // Redireciona para index.html
        }
    });

    function validateForm() {
        const email = document.getElementById('exampleInputEmail1').value.trim();
        const cpf = document.querySelector('input[name="cpf"]').value.trim();
        const senha = document.getElementById('exampleInputPassword1').value.trim();
        const confirmarSenha = document.getElementById('exampleInputPassword2').value.trim();
        const checkbox = document.getElementById('exampleCheck1').checked;

        let isValid = true;

        clearErrors();

        // Valida o campo Email
        if (email === '') {
            showError('exampleInputEmail1', 'O campo Email é obrigatório.');
            isValid = false;
        }

        // Valida CPF
        const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (cpf === '') {
            showError('cpf', 'O campo CPF é obrigatório.');
            isValid = false;
        } else if (!cpfPattern.test(cpf)) {
            showError('cpf', 'O CPF deve estar no formato xxx.xxx.xxx-xx.');
            isValid = false;
        }

        // Valida Senha
        if (senha === '') {
            showError('exampleInputPassword1', 'O campo Senha é obrigatório.');
            isValid = false;
        }

        // Valida Confirmar Senha
        if (confirmarSenha === '') {
            showError('exampleInputPassword2', 'O campo Confirmar Senha é obrigatório.');
            isValid = false;
        } else if (senha !== confirmarSenha) {
            showError('exampleInputPassword2', 'As senhas não coincidem.');
            isValid = false;
        }

        // Valida a Checkbox
        if (!checkbox) {
            showError('exampleCheck1', 'Você deve confirmar seus dados.');
            isValid = false;
        }

        return isValid;
    }

    function clearErrors() {
        const errors = document.querySelectorAll('.error');
        errors.forEach(error => {
            error.textContent = '';
            error.classList.remove('show');
        });
    }

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId) || document.querySelector(`input[name="${fieldId}"]`);
        const error = document.getElementById(`error${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)}`);

        if (error) {
            error.textContent = message;
            error.classList.add('show'); // Adiciona a classe para mostrar o balão de erro
            const fieldRect = field.getBoundingClientRect();
            error.style.top = `${fieldRect.bottom + window.scrollY + 5}px`;
            error.style.left = `${fieldRect.left + window.scrollX}px`;
        }
    }
});
