let inputEmailForm = document.querySelector('.input-email-form')
let inputPasswordForm = document.querySelector('.input-pw-form')

// 이메일 입력 후 계속을 눌렀을 때
function buttonNext() {
    // 이메일 입력 값 가져오기
    const emailInput = document.getElementById('email');
    const userEmailDisplay = document.querySelector('.user-email');

    // 이메일 표시 업데이트
    userEmailDisplay.textContent = emailInput.value;

    inputEmailForm.style.display = 'none'
    inputPasswordForm.style.display = 'block'
}

function buttonLast() {
    inputEmailForm.style.display = 'block'
    inputPasswordForm.style.display = 'none'
}

// 이메일 유효성 검사
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


// 로그인 데이터 전송
let login = document.getElementById("login");

login.addEventListener("click", function () {
    let form = document.getElementById("form");
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    form.mothod = "GET";
    form.submit();
});
