
// DOM 요소 선택
const signupForm = {
    givenName: document.getElementById('user-given-name'),
    surname: document.getElementById('user-surname'),
    password: document.getElementById('user-password'),
    birthDate: document.getElementById('user-birth'),
    agreement: document.querySelector('input[name="agreement"]'),
    submitButton: document.getElementById('signup')
};

// 폼 유효성 상태
const formValidation = {
    isPasswordMinLength: false,
    isPasswordComplex: false,
    isAgreementChecked: false
};

// 비밀번호 유효성 검사
function validatePassword(password) {
    // 최소 8자 검사
    formValidation.isPasswordMinLength = password.length >= 8;
    updatePasswordValidationUI('min-length', formValidation.isPasswordMinLength);

    // 복잡성 검사 (대소문자, 숫자)
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    formValidation.isPasswordComplex = hasUpperCase && hasLowerCase && hasNumber;
    updatePasswordValidationUI('complexity', formValidation.isPasswordComplex);
}

// 비밀번호 유효성 UI 업데이트
function updatePasswordValidationUI(type, isValid) {
    const elements = {
        x: document.getElementById(`pw-${type}-x`),
        check: document.getElementById(`pw-${type}-check`),
        text: document.getElementById(`pw-${type}-text`)
    };

    if (isValid) {
        elements.text.style.color = 'var(--color-green-1)';
        elements.x.classList.remove('visible');
        elements.x.classList.add('hidden');
        elements.check.classList.remove('hidden');
        elements.check.classList.add('visible');
    } else {
        elements.text.style.color = 'var(--color-gray-5)';
        elements.x.classList.remove('hidden');
        elements.x.classList.add('visible');
        elements.check.classList.remove('visible');
        elements.check.classList.add('hidden');
    }
}

// 전체 폼 유효성 검사
function validateForm() {
    const isFormValid =
        signupForm.givenName.value.trim() !== '' &&
        signupForm.surname.value.trim() !== '' &&
        formValidation.isPasswordMinLength &&
        formValidation.isPasswordComplex &&
        signupForm.birthDate.value !== '' &&
        formValidation.isAgreementChecked;  // 약관 동의 여부 확인

    signupForm.submitButton.disabled = !isFormValid;

    // 버튼 스타일 업데이트
    if (isFormValid) {
        signupForm.submitButton.classList.add('active');
    } else {
        signupForm.submitButton.classList.remove('active');
    }

    console.log(signupForm.givenName, signupForm.surname, signupForm.password, signupForm.birthDate)
}

validateForm()

