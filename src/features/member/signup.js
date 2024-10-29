const submitButton = document.getElementById('signup');

// 비밀번호 유효성 검사
const inputPassword = document.querySelector('input[type="password"]');
const minLengthElement = document.getElementById('pw-min-length');
const minLengthText = document.getElementById('pw-min-text');
const complexityElement = document.getElementById('pw-complexity');
const complexityText = document.getElementById('pw-complexity-text');

inputPassword.addEventListener('input', function (e) {
    const password = e.target.value;

    // 최소 8자 검사
    if (password.length >= 8) {
        minLengthText.style.color = 'var(--color-green-1)';
        document.getElementById('pw-min-length-x').classList.remove('visible');
        document.getElementById('pw-min-length-x').classList.add('hidden');
        document.getElementById('pw-min-length-check').classList.remove('hidden');
        document.getElementById('pw-min-lenㅅgth-check').classList.add('visible');
    } else {
        minLengthText.style.color = 'var(--color-gray-5)';
        document.getElementById('pw-min-length-x').classList.remove('hidden');
        document.getElementById('pw-min-length-x').classList.add('visible');
        document.getElementById('pw-min-length-check').classList.remove('visible');
        document.getElementById('pw-min-length-check').classList.add('hidden');
    }

    // 복잡성 검사 (대소문자, 숫자 조합)
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (hasUpperCase && hasLowerCase && hasNumber) {
        complexityText.style.color = 'var(--color-green-1)';
        document.getElementById('pw-complexity-x').classList.remove('visible');
        document.getElementById('pw-complexity-x').classList.add('hidden');
        document.getElementById('pw-complexity-check').classList.remove('hidden');
        document.getElementById('pw-complexity-check').classList.add('visible');
    } else {
        complexityText.style.color = 'var(--color-gray-5)';
        document.getElementById('pw-complexity-x').classList.remove('hidden');
        document.getElementById('pw-complexity-x').classList.add('visible');
        document.getElementById('pw-complexity-check').classList.remove('visible');
        document.getElementById('pw-complexity-check').classList.add('hidden');
    }
});

function handleAgreement(submitButton) {
    if (submitButton.checked) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}