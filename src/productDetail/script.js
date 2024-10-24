class NikeHeader extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
		const template = document.getElementById('nike-header')
		const clone = template.content.cloneNode(true)
		this.shadowRoot.appendChild(clone)
	}
}

customElements.define('nike-header', NikeHeader)

class NikeFooter extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
		const template = document.getElementById('nike-footer')
		const clone = template.content.cloneNode(true)
		this.shadowRoot.appendChild(clone)
	}
}

customElements.define('nike-footer', NikeFooter)

// document.querySelectorAll('details').forEach(details => {
// 	const summary = details.querySelector('summary')
// 	const summaryContent = details.querySelector('.summaryContent')

// 	summary.addEventListener('click', function (event) {
// 		event.preventDefault()

// 		if (details.open) {
// 			// 닫힐 때 애니메이션 적용
// 			const contentHeight = summaryContent.scrollHeight
// 			details.style.transition = 'none'
// 			details.style.maxHeight = contentHeight + 'px'

// 			// 리플로우 강제 발생
// 			requestAnimationFrame(() => {
// 				details.style.transition = 'max-height 200ms ease-in-out'
// 				details.style.maxHeight = '95px'
// 			})

// 			// 애니메이션이 끝난 후에 open 속성 제거
// 			setTimeout(() => {
// 				details.removeAttribute('open')
// 				details.style.maxHeight = ''
// 			}, 200)
// 		} else {
// 			// 열릴 때 애니메이션 적용
// 			details.setAttribute('open', '')
// 			const contentHeight = summaryContent.scrollHeight
// 			details.style.transition = 'none'
// 			details.style.maxHeight = '95px'

// 			requestAnimationFrame(() => {
// 				details.style.transition = 'max-height 200ms ease-in-out'
// 				details.style.maxHeight = contentHeight + 'px'
// 			})

// 			// 애니메이션 완료 후 max-height 초기화
// 			setTimeout(() => {
// 				details.style.maxHeight = '100vh'
// 			}, 200)
// 		}
// 	})
// })

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

const colorSlider = document.getElementById('prodImageFrame')

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
	const x = e.pageX - colorSlider.offsetLeft
	const walk = (x - startX) * 2
	colorSlider.scrollLeft = scrollLeft - walk
})

// 추천 상품 슬라이더

const recommendedSlider = document.getElementById('recommendedItemsSection')

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
function openReviewPage() {
	window.open(
		'writeReview.html',
		'_blank',
		'top = 10, left = 10, width = 345 height = 700'
	)
}

// 제품 상세 정보 보기 페이지 토글 용
function showModal() {
	document.getElementById('background').classList.add('show-background')
	document.getElementById('productDetail').classList.add('show-modal')
}

function hideModal() {
	document.getElementById('background').classList.remove('show-background')
	document.getElementById('productDetail').classList.remove('show-modal')
}

// 제품의 다른 색상 선택 시각적 효과, api 관련된 이벤트도 추가할 수 있음
const productColors = document.querySelectorAll('.prodImageColorFrame')

productColors.forEach(item => {
	item.addEventListener('click', () => {
		// 이미 선택된 색상에 대해서는 반응 x
		if (item.classList[1] === 'selected') {
			return
		} else {
			// 한 요소만 선택되도록 모든 요소 초기화 후 진행
			productColors.forEach(el => {
				el.classList.remove('selected')
			})
			item.classList.add('selected')
			const Frame = document.getElementById('prodImageFrame')
			Frame.childNodes[1].setAttribute(
				'src',
				`${item.childNodes[1].getAttribute('src')}`
			)
		}
	})
})

// 제품의 다른 사이즈 선택 시각적 효과, api 관련된 이벤트도 추가할 수 있음

const sizeSelection = document.querySelectorAll('.size')

sizeSelection.forEach(item => {
	item.addEventListener('click', () => {
		// 이미 선택된 사이즈거나 존재하지 않는 사이즈에 대해서는 반응 x
		if (item.classList[1] === 'selected' || item.classList[1] === 'off') {
			return
		} else {
			// 한 요소만 선택되도록 모든 요소 초기화 후 진행
			sizeSelection.forEach(el => {
				el.classList.remove('selected')
			})
			item.classList.add('selected')
		}
	})
})
