// 상단 내비게이션 바 드래그
let mouseDown = false
let startX, scrollLeft
const slider = document.getElementById('navi')

const startDragging = e => {
	mouseDown = true
	startX = e.pageX - slider.offsetLeft
	scrollLeft = slider.scrollLeft
}

const stopDragging = e => {
	mouseDown = false
}

const move = e => {
	e.preventDefault()
	if (!mouseDown) {
		return
	}
	const x = e.pageX - slider.offsetLeft
	const scroll = x - startX
	slider.scrollLeft = scrollLeft - scroll
}

// Add the event listeners
slider.addEventListener('mousemove', move, false)
slider.addEventListener('mousedown', startDragging, false)
slider.addEventListener('mouseup', stopDragging, false)
slider.addEventListener('mouseleave', stopDragging, false)
// 여기까지 상단 드래그 바

// 필터 메뉴
// Action Sheet 보이기
function showActionSheet() {
	document.getElementById('filter').classList.add('active')
}

// Action Sheet 감추기
function hideActionSheet() {
	document.getElementById('filter').classList.remove('active')
}

// Header, Footer 컴포넌트화
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
