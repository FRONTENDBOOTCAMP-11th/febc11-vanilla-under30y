'use strinct'

// 이미지 슬라이더
const imageSlider = document.getElementById('prodImageFrame')
//색상 슬라이더
const colorSlider = document.getElementById('prodImageColor')
// 추천 상품 슬라이더
const recommendedSlider = document.getElementById('recommendedItemsSection')

let isMouseDown = false
let startX, scrollLeft

function createSlider(node) {
	node.addEventListener('mousedown', e => {
		e.preventDefault()
		isMouseDown = true
		node.classList.add('active')

		startX = e.pageX - node.offsetLeft
		scrollLeft = node.scrollLeft
	})

	node.addEventListener('mouseleave', () => {
		isMouseDown = false
		node.classList.remove('active')
	})

	node.addEventListener('mouseup', () => {
		isMouseDown = false
		node.classList.remove('active')
	})

	node.addEventListener('mousemove', e => {
		if (!isMouseDown) return

		e.preventDefault()
		const x = e.pageX - node.offsetLeft
		const walk = (x - startX) * 2
		node.scrollLeft = scrollLeft - walk
	})

	node.addEventListener('mousedown', e => {
		e.preventDefault()
		isMouseDown = true
		node.classList.add('active')

		startX = e.pageX - node.offsetLeft
		scrollLeft = node.scrollLeft
	})
}

createSlider(imageSlider)
createSlider(colorSlider)
createSlider(recommendedSlider)

// 리뷰 작성 페이지 열기
document.querySelector('.writeReview').addEventListener('click', () => {
	window.open(
		'writeReview.html',
		'_blank',
		'top = 10, left = 10, width = 450 height = 700'
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
