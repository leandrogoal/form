let B7Validator = {
    handleSubmit: (event) => {
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');

        B7Validator.clearErrors();

        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = B7Validator.checkInput(input);
            if (check !== true) {
                send = false;
                B7Validator.showError(input, check);
            }
        }

        if (send) {
            form.submit();
        }
    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');
        let value = input.value.trim();

        if (rules !== null) {
            rules = rules.split('|');
            for (let k in rules) {
                let rDetails = rules[k].split('=');
                switch (rDetails[0]) {
                    case 'required':
                        if (value === '') {
                            return 'Campo não pode ser vazio.';
                        }
                        break;
                    case 'min':
                        if (value.length < rDetails[1]) {
                            return `Campo deve ter pelo menos ${rDetails[1]} caracteres.`;
                        }
                        break;
                    case 'email':
                        if (value !== '') {
                            // Regex universal de validação de e-mail
                            let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!regex.test(value)) {
                                return 'E-mail digitado não é válido!';
                            }
                        }
                        break;
                    case 'match':
                        let matchField = document.querySelector(`[name="${rDetails[1]}"]`);
                        if (matchField && matchField.value !== value) {
                            return 'Os campos não coincidem.';
                        }
                        break;
                }
            }
        }

        return true;
    },
    showError: (input, error) => {
        input.style.borderColor = '#FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.nextElementSibling);
    },
    clearErrors: () => {
        let inputs = form.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    },
    togglePassword: () => {
        document.querySelectorAll('.toggle-password').forEach(button => {
            button.addEventListener('click', () => {
                const target = document.querySelector(`#${button.getAttribute('data-target')}`);
                if (target) {
                    const icon = button.querySelector('i');
                    if (target.type === 'password') {
                        target.type = 'text';
                        icon.classList.remove('fa-eye');
                        icon.classList.add('fa-eye-slash');
                    } else {
                        target.type = 'password';
                        icon.classList.remove('fa-eye-slash');
                        icon.classList.add('fa-eye');
                    }
                }
            });
        });
    }
};

let form = document.querySelector('.b7validator');
form.addEventListener('submit', B7Validator.handleSubmit);

// Initialize password visibility toggle
B7Validator.togglePassword();
