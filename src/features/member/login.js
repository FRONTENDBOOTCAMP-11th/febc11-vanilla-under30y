let inputEmailForm = document.querySelector('.input-email-form')
let inputPasswordForm = document.querySelector('.input-pw-form')

// 이메일 입력 후 계속을 눌렀을 때
function buttonNext() {
    const emailInput = document.getElementById('email');
    const userEmailDisplay = document.querySelector('.user-email');

    // validateEmail 함수의 반환값을 확인
    if (validateEmail(emailInput)) {
        userEmailDisplay.textContent = emailInput.value;
        inputEmailForm.style.display = 'none';
        inputPasswordForm.style.display = 'block';
    }
    // 유효하지 않은 경우는 validateEmail 함수 내에서 처리됨
}

// 이전 버튼 눌렀을 때
function buttonLast() {
    inputEmailForm.style.display = 'block'
    inputPasswordForm.style.display = 'none'
}

// 이메일 유효성 검사
function validateEmail(input) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const message = document.getElementById('validationMessage');
    const inputEmail = document.querySelector('.user-login-input');  // getElementsByClassName에서 변경

    if (input.value === '') {
        message.textContent = '필수';
        message.style.display = 'block';
        inputEmail.style.borderColor = 'var(--color-red-1)';
        return false;
    } else if (emailPattern.test(input.value)) {
        message.style.display = 'none';
        inputEmail.style.borderColor = '';  // 기본 테두리로 복원
        return true;
    } else {
        message.textContent = '유효하지 않은 이메일 형식입니다';
        message.style.display = 'block';
        inputEmail.style.borderColor = 'var(--color-red-1)';
        return false;
    }
}

// 로그인 버튼 클릭시 데이터 전송
let login = document.getElementById("login");

login.addEventListener("click", function () {
    let form = document.getElementById("form");
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    form.mothod = "GET";
    form.submit();
});
