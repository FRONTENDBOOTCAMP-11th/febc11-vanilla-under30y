'use strinct'

// 이미지 슬라이더
const imageSlider = document.getElementById('prodImageFrame')

let isMouseDown = false
let startX, scrollLeft

imageSlider.addEventListener('mousedown', e => {
	e.preventDefault()
	isMouseDown = true
	imageSlider.classList.add('active')

	startX = e.pageX - imageSlider.offsetLeft
	scrollLeft = imageSlider.scrollLeft
})

imageSlider.addEventListener('mouseleave', () => {
	isMouseDown = false
	imageSlider.classList.remove('active')
})

imageSlider.addEventListener('mouseup', () => {
	isMouseDown = false
	imageSlider.classList.remove('active')
})

imageSlider.addEventListener('mousemove', e => {
	if (!isMouseDown) return

	e.preventDefault()
	const x = e.pageX - imageSlider.offsetLeft
	const walk = (x - startX) * 2
	imageSlider.scrollLeft = scrollLeft - walk
})

imageSlider.addEventListener('mousedown', e => {
	e.preventDefault()
	isMouseDown = true
	imageSlider.classList.add('active')

	startX = e.pageX - imageSlider.offsetLeft
	scrollLeft = imageSlider.scrollLeft
})

// 색상 선택 슬라이더

const colorSlider = document.getElementById('prodImageColor')

colorSlider.addEventListener('mousedown', e => {
	e.preventDefault()
	isMouseDown = true
	colorSlider.classList.add('active')

	startX = e.pageX - colorSlider.offsetLeft
	scrollLeft = colorSlider.scrollLeft
})

colorSlider.addEventListener('mouseleave', () => {
	isMouseDown = false
	colorSlider.classList.remove('active')
})

colorSlider.addEventListener('mouseup', () => {
	isMouseDown = false
	colorSlider.classList.remove('active')
})

colorSlider.addEventListener('mousemove', e => {
	if (!isMouseDown) return

	e.preventDefault()
	const x = e.pageX - colorSlider.offsetLefts
	const walk = (x - startX) * 2
	colorSlider.scrollLeft = scrollLeft - walk
})

// 추천 상품 슬라이더

const recommendedSlider = document.getElementById('recommendedItemsSection')

recommendedSlider.addEventListener('mousedown', e => {
	e.preventDefault()
	isMouseDown = true
	recommendedSlider.classList.add('active')

	startX = e.pageX - recommendedSlider.offsetLeft
	scrollLeft = recommendedSlider.scrollLeft
})

recommendedSlider.addEventListener('mouseleave', () => {
	isMouseDown = false
	recommendedSlider.classList.remove('active')
})

recommendedSlider.addEventListener('mouseup', () => {
	isMouseDown = false
	recommendedSlider.classList.remove('active')
})

recommendedSlider.addEventListener('mousemove', e => {
	if (!isMouseDown) return

	e.preventDefault()
	const x = e.pageX - recommendedSlider.offsetLeft
	const walk = (x - startX) * 2
	recommendedSlider.scrollLeft = scrollLeft - walk
})

// 리뷰 작성 페이지 열기
document.querySelector('.writeReview').addEventListener('click', () => {
	window.open(
		'writeReview.html',
		'_blank',
		'top = 10, left = 10, width = 345 height = 700'
	)
})

// 제품 상세 정보 보기 페이지 토글 용
const showModal = document.querySelector('.prodDetail')

showModal.addEventListener('click', () => {
	document.getElementById('background').classList.add('show-background')
	document.getElementById('productDetail').classList.add('show-modal')
})

const hideModal = [
	document.querySelector('.background'),
	document.querySelector('.closeButton')
]

hideModal.forEach(item => {
	item.addEventListener('click', () => {
		document
			.getElementById('background')
			.classList.remove('show-background')
		document.getElementById('productDetail').classList.remove('show-modal')
	})
})
