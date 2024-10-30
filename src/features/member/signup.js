import axios from 'axios'
import { valid } from './validate.js'

const joinEmailSection = document.querySelector('.join-email-section')
const buttonToAuthority = document.querySelector('.button-to-authority')
const authoritySection = document.querySelector('.authority-section')
const buttonToSignup = document.querySelector('.button-to-signup')
const personalInformationSection = document.querySelector(
	'.personal-information-section'
)

// DOM 요소 선택
const signupForm = {
	email: document.getElementById('email'),
	givenName: document.getElementById('user-given-name'),
	surname: document.getElementById('user-surname'),
	password: document.getElementById('user-password'),
	birthDate: document.getElementById('user-birth'),
	agreement: document.querySelector('input[name="agreement"]'),
	submitButton: document.getElementById('signup')
}

// 이메일 입력시 화면 설정
authoritySection.style.display = 'none'
personalInformationSection.style.display = 'none'

// 이메일 입력 후 권한 동의 섹션으로 이동
buttonToAuthority.addEventListener('click', () => {
	// 이메일 유효성 검사
	if (valid.validateEmail(signupForm.email.value)) {
		formValidation.isEmail = true
		// 현재 섹션 숨기기
		joinEmailSection.style.display = 'none'
		// 다음 섹션 보여주기
		authoritySection.style.display = 'block'
	}
	// validateEmail 함수에서 유효하지 않은 경우 처리
})

// 권한 동의 후 개인정보 입력 섹션으로 이동
buttonToSignup.addEventListener('click', () => {
	// 현재 섹션 숨기기
	authoritySection.style.display = 'none'
	// 다음 섹션 보여주기
	personalInformationSection.style.display = 'block'
})

// 폼 유효성 상태
const formValidation = {
	isEmail: false,
	isPasswordMinLength: false,
	isPasswordComplex: false,
	isAgreementChecked: false
}

// 전체 폼 유효성 검사
function validateForm() {
	const isFormValid =
		signupForm.email.value.trim() !== '' &&
		signupForm.givenName.value.trim() !== '' &&
		signupForm.surname.value.trim() !== '' &&
		formValidation.isPasswordMinLength &&
		formValidation.isPasswordComplex &&
		signupForm.birthDate.value !== '' &&
		formValidation.isAgreementChecked // 약관 동의 여부 확인

	signupForm.submitButton.disabled = !isFormValid

	// 버튼 스타일 업데이트
	if (isFormValid) {
		signupForm.submitButton.classList.add('active')
	} else {
		signupForm.submitButton.classList.remove('active')
	}

	console.log(
		signupForm.email,
		signupForm.givenName,
		signupForm.surname,
		signupForm.password,
		signupForm.birthDate
	)
}

// 회원가입 데이터 전송 함수
async function handleSignup() {
	try {
		console.log('회원가입 시도 중...')

		// 전송할 데이터 객체 생성
		const signupData = {
			givenName: signupForm.givenName.value.trim(),
			surname: signupForm.surname.value.trim(),
			password: signupForm.password.value,
			birthDate: signupForm.birthDate.value
		}

		// 전송할 데이터 콘솔에 출력
		console.log('전송할 회원가입 데이터:', signupData)

		// POST 요청 보내기
		const response = await axios({
			method: 'POST',
			url: 'https://11.fesp.shop/users',
			headers: {
				'client-id': 'vanilla04'
			},
			data: {
				givenName: signupForm.givenName.value.trim(),
				surname: signupForm.surname.value.trim(),
				password: signupForm.password.value,
				birthDate: signupForm.birthDate.value
			}
		})

		// 응답 데이터 콘솔에 출력
		console.log('서버 응답:', response.data)

		// 성공적으로 응답을 받았을 경우
		if (response.status === 200 || response.status === 201) {
			console.log('회원가입 성공!')
			alert('회원가입이 완료되었습니다!')
			// 로그인 페이지로 리다이렉트
			window.location.href = '/../../../index.html'
		}
	} catch (error) {
		console.error('회원가입 요청 중 에러 발생:', error)
	}
}

// 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', () => {
	// 비밀번호 입력 시 유효성 검사
	signupForm.password.addEventListener('input', e => {
		const validationResult = valid.validatePassword(e.target.value)
		formValidation.isPasswordMinLength =
			validationResult.isPasswordMinLength
		formValidation.isPasswordComplex = validationResult.isPasswordComplex
		validateForm()
	})

	// 약관 동의 체크박스 변경 시
	signupForm.agreement.addEventListener('change', e => {
		formValidation.isAgreementChecked = e.target.checked
		validateForm()
	})

	// 다른 입력 필드들의 변경 감지
	signupForm.givenName.addEventListener('input', validateForm)
	signupForm.surname.addEventListener('input', validateForm)
	signupForm.birthDate.addEventListener('input', validateForm)

	// 회원가입 버튼 클릭 이벤트
	signupForm.submitButton.addEventListener('click', e => {
		e.preventDefault()
		console.log('회원가입 버튼 클릭됨!')
		handleSignup()
	})
})

// 초기 폼 검사 실행
validateForm()

function switchSection(hideSection, showSection) {
	hideSection.classList.add('hidden')
	setTimeout(() => {
		hideSection.style.display = 'none'
		showSection.style.display = 'block'
		setTimeout(() => {
			showSection.classList.remove('hidden')
		}, 50)
	}, 300)
}
