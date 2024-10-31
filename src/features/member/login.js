import axios from 'axios'
import { valid } from './validate.js'

const inputEmailForm = document.querySelector('.input-email-form')
const next = document.getElementById('next')
const inputPasswordForm = document.querySelector('.input-pw-form')
const last = document.getElementById('last')
const login = document.getElementById('login')
const emailInput = document.getElementById('email')

// 이메일 입력 이벤트 리스너 추가
emailInput.addEventListener('input', function (event) {
	event.preventDefault()
	valid.validateEmail(this.value)
})

// 이메일 입력 후 계속을 눌렀을 때
<<<<<<< HEAD
next.addEventListener('click', function (event) {
	event.preventDefault()
	const userEmailDisplay = document.querySelector('.user-email')

	// validateEmail 함수의 반환값을 확인
	if (valid.validateEmail(emailInput.value)) {
=======
function buttonNext() {
	const emailInput = document.getElementById('email')
	const userEmailDisplay = document.querySelector('.user-email')

	// validateEmail 함수의 반환값을 확인
	if (validateEmail(emailInput)) {
>>>>>>> develop
		userEmailDisplay.textContent = emailInput.value
		inputEmailForm.style.display = 'none'
		inputPasswordForm.style.display = 'block'
	}
	// 유효하지 않은 경우는 validateEmail 함수 내에서 처리됨
<<<<<<< HEAD
})

// 이전 버튼 눌렀을 때
last.addEventListener('click', function (event) {
	event.preventDefault()
	inputEmailForm.style.display = 'block'
	inputPasswordForm.style.display = 'none'
})

// 로그인 버튼 클릭시 데이터 전송
login.addEventListener('click', async function (event) {
	event.preventDefault()
	let email = document.getElementById('email')
	let password = document.getElementById('password')
	console.log(email.value, password.value)

	const response = await axios({
		method: 'POST',
		url: 'https://11.fesp.shop/users/login',
		headers: {
			'client-id': 'vanilla04'
		},
		data: {
			email: email.value,
			password: password.value
		}
	})

	// sessionStorage에 토큰 저장
	sessionStorage.setItem('accessToken', response.data.accessToken)

	window.location.href = '/../../../index.html'

=======
}

// 이전 버튼 눌렀을 때
function buttonLast() {
	inputEmailForm.style.display = 'block'
	inputPasswordForm.style.display = 'none'
}

// 이메일 유효성 검사
function validateEmail(input) {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	const message = document.getElementById('validationMessage')
	const inputEmail = document.querySelector('.user-login-input') // getElementsByClassName에서 변경

	if (input.value === '') {
		message.textContent = '필수'
		message.style.display = 'block'
		inputEmail.style.borderColor = 'var(--color-red-1)'
		return false
	} else if (emailPattern.test(input.value)) {
		message.style.display = 'none'
		inputEmail.style.borderColor = '' // 기본 테두리로 복원
		return true
	} else {
		message.textContent = '유효하지 않은 이메일 형식입니다'
		message.style.display = 'block'
		inputEmail.style.borderColor = 'var(--color-red-1)'
		return false
	}
}

// 로그인 버튼 클릭시 데이터 전송
let login = document.getElementById('login')

login.addEventListener('click', async function (event) {
	event.preventDefault()
	let email = document.getElementById('email')
	let password = document.getElementById('password')
	console.log(email.value, password.value)

	const response = await axios({
		method: 'POST',
		url: 'https://11.fesp.shop/users/login',
		headers: {
			'client-id': 'vanilla04'
		},
		data: {
			email: email.value,
			password: password.value
		}
	})

	// sessionStorage에 토큰 저장
	sessionStorage.setItem('accessToken', response.data.accessToken)

	window.location.href = '/../../../index.html'

>>>>>>> develop
	console.log(response)
})
