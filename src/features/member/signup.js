import axios from 'axios';

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

// 회원가입 데이터 전송 함수
async function handleSignup() {
    try {
        console.log('회원가입 시도 중...');

        // 전송할 데이터 객체 생성
        const signupData = {
            givenName: signupForm.givenName.value.trim(),
            surname: signupForm.surname.value.trim(),
            password: signupForm.password.value,
            birthDate: signupForm.birthDate.value
        };

        // 전송할 데이터 콘솔에 출력
        console.log('전송할 회원가입 데이터:', signupData);

        // POST 요청 보내기
        const response = await axios({
            method: "POST",
            url: "https://11.fesp.shop/users",
            headers: {
                "client-id": "vanilla04"
            },
            data: {
                givenName: signupForm.givenName.value.trim(),
                surname: signupForm.surname.value.trim(),
                password: signupForm.password.value,
                birthDate: signupForm.birthDate.value
            }
        });

        // 응답 데이터 콘솔에 출력
        console.log('서버 응답:', response.data);

        // 성공적으로 응답을 받았을 경우
        if (response.status === 200 || response.status === 201) {
            console.log('회원가입 성공!');
            alert('회원가입이 완료되었습니다!');
            // 로그인 페이지로 리다이렉트
            window.location.href = '/../../../index.html';
        }
    } catch (error) {
        console.error('회원가입 요청 중 에러 발생:', error);
    }
}

// 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', () => {
    // 비밀번호 입력 시 유효성 검사
    signupForm.password.addEventListener('input', (e) => {
        validatePassword(e.target.value);
        validateForm();
    });

    // 약관 동의 체크박스 변경 시
    signupForm.agreement.addEventListener('change', (e) => {
        formValidation.isAgreementChecked = e.target.checked;
        validateForm();
    });

    // 다른 입력 필드들의 변경 감지
    signupForm.givenName.addEventListener('input', validateForm);
    signupForm.surname.addEventListener('input', validateForm);
    signupForm.birthDate.addEventListener('input', validateForm);

    // 회원가입 버튼 클릭 이벤트
    signupForm.submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('회원가입 버튼 클릭됨!');
        handleSignup();
    });
});

// 초기 폼 검사 실행
validateForm();