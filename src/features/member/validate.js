// 이메일 유효성 검사
export const valid = {
    validateEmail(input) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const message = document.getElementById('validationMessage');
        const inputEmail = document.querySelector('.user-login-input');  // getElementsByClassName에서 변경

        if (input.value === '') {
            message.textContent = '필수';
            message.style.display = 'block';
            inputEmail.style.borderColor = 'var(--color-red-1)';
            return false;
        } else if (emailPattern.test(input)) {
            message.style.display = 'none';
            inputEmail.style.borderColor = '';  // 기본 테두리로 복원
            return true;
        } else {
            message.textContent = '유효하지 않은 이메일 형식입니다';
            message.style.display = 'block';
            inputEmail.style.borderColor = 'var(--color-red-1)';
            return false;
        }
    },

    // 비밀번호 유효성 검사
    validatePassword(password) {
        // 최소 8자 검사
        signup.formValidation.isPasswordMinLength = password.length >= 8;
        updatePasswordValidationUI('min-length', formValidation.isPasswordMinLength);

        // 복잡성 검사 (대소문자, 숫자)
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        formValidation.isPasswordComplex = hasUpperCase && hasLowerCase && hasNumber;
        updatePasswordValidationUI('complexity', formValidation.isPasswordComplex);
    },

    // 비밀번호 유효성 UI 업데이트
    updatePasswordValidationUI(type, isValid) {
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
}

export default valid;