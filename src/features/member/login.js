let inputEmailForm = document.querySelector('.input-email-form')
let inputPasswordForm = document.querySelector('.input-pw-form')

function buttonNext() {
    inputEmailForm.style.display = 'none'
    inputPasswordForm.style.display = 'block'
}

function buttonLast() {
    inputEmailForm.style.display = 'block'
    inputPasswordForm.style.display = 'none'
}


let login = document.getElementById("login");

login.addEventListener("click", function () {
    let form = document.getElementById("form");
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    form.mothod = "GET";
    form.submit();
});

function validateEmail(input) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const message = document.getElementById('validationMessage');
    const inputEmail = document.getElementsByClassName('user-login-input');

    if (input.value === '') {
        message.textContent = '필수';
        message.style.display = 'block';
        inputEmail.style.borderColor = 'var(--color-red-1)';
    } else if (emailPattern.test(input.value)) {
        message.style.display = 'none';
    } else {
        message.textContent = '유효하지 않은 이메일 형식입니다';
        message.style.display = 'block';
        inputEmail.style.borderColor = 'var(--color-red-1)';
    }
}