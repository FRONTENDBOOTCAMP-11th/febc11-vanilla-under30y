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
	connectedCallback() {
		this.menuToggle()
		this.overlay()
		this.activeSidemenu()
		this.activeSidemenu2()
		this.activeSidemenu3()
		this.activeSidemenu4()
		this.activeSidemenu5()
		this.closeMenu()
		this.backMenu()
	}

	menuToggle() {
		const menuToggle = this.shadowRoot.getElementById('menuToggle')
		const sideMenu = this.shadowRoot.getElementById('sideMenu')
		const overlay = this.shadowRoot.getElementById('overlay')
		menuToggle.addEventListener('click', function () {
			sideMenu.classList.add('menu-active')
			overlay.classList.add('overlay-active')
		})
	}

	overlay() {
		const submenuList = this.shadowRoot.querySelectorAll('.submenu')
		const sideMenu = this.shadowRoot.getElementById('sideMenu')
		const overlay = this.shadowRoot.getElementById('overlay')
		overlay.addEventListener('click', function () {
			sideMenu.classList.remove('menu-active')
			overlay.classList.remove('overlay-active')
			submenuList.forEach(value => {
				value.classList.remove('submenu-active')
			})
		})
	}

	activeSidemenu() {
		const newfeatured = this.shadowRoot.getElementById('newfeatured')
		const submenu = this.shadowRoot.getElementById('submenu')
		newfeatured.addEventListener('click', function () {
			submenu.classList.add('submenu-active')
		})
	}

	activeSidemenu2() {
		const man = this.shadowRoot.getElementById('man')
		const submenu2 = this.shadowRoot.getElementById('submenu2')
		man.addEventListener('click', function () {
			submenu2.classList.add('submenu-active')
		})
	}

	activeSidemenu3() {
		const woman = this.shadowRoot.getElementById('woman')
		const submenu3 = this.shadowRoot.getElementById('submenu3')
		woman.addEventListener('click', function () {
			submenu3.classList.add('submenu-active')
		})
	}

	activeSidemenu4() {
		const kid = this.shadowRoot.getElementById('kid')
		const submenu4 = this.shadowRoot.getElementById('submenu4')
		kid.addEventListener('click', function () {
			submenu4.classList.add('submenu-active')
		})
	}

	activeSidemenu5() {
		const sale = this.shadowRoot.getElementById('sale')
		const submenu5 = this.shadowRoot.getElementById('submenu5')
		sale.addEventListener('click', function () {
			submenu5.classList.add('submenu-active')
		})
	}

	closeMenu() {
		const submenuList = this.shadowRoot.querySelectorAll('.submenu')
		const sideMenu = this.shadowRoot.getElementById('sideMenu')
		const overlay = this.shadowRoot.getElementById('overlay')
		const exit = this.shadowRoot.getElementById('menu-exit')
		const exit2 = this.shadowRoot.getElementById('menu-exit2')
		const exit3 = this.shadowRoot.getElementById('menu-exit3')
		const exit4 = this.shadowRoot.getElementById('menu-exit4')
		const exit5 = this.shadowRoot.getElementById('menu-exit5')
		const exit6 = this.shadowRoot.getElementById('menu-exit6')
		exit.addEventListener('click', function () {
			sideMenu.classList.remove('menu-active')
			overlay.classList.remove('overlay-active')
			submenuList.forEach(value => {
				value.classList.remove('submenu-active')
			})
		})
		exit2.addEventListener('click', function () {
			sideMenu.classList.remove('menu-active')
			overlay.classList.remove('overlay-active')
			submenuList.forEach(value => {
				value.classList.remove('submenu-active')
			})
		})
		exit3.addEventListener('click', function () {
			sideMenu.classList.remove('menu-active')
			overlay.classList.remove('overlay-active')
			submenuList.forEach(value => {
				value.classList.remove('submenu-active')
			})
		})
		exit4.addEventListener('click', function () {
			sideMenu.classList.remove('menu-active')
			overlay.classList.remove('overlay-active')
			submenuList.forEach(value => {
				value.classList.remove('submenu-active')
			})
		})
		exit5.addEventListener('click', function () {
			sideMenu.classList.remove('menu-active')
			overlay.classList.remove('overlay-active')
			submenuList.forEach(value => {
				value.classList.remove('submenu-active')
			})
		})
		exit6.addEventListener('click', function () {
			sideMenu.classList.remove('menu-active')
			overlay.classList.remove('overlay-active')
			submenuList.forEach(value => {
				value.classList.remove('submenu-active')
			})
		})
	}

	backMenu() {
		const submenuList = this.shadowRoot.querySelectorAll('.submenu')
		const sideMenu = this.shadowRoot.getElementById('sideMenu')
		const back = this.shadowRoot.getElementById('backbutton')
		const back2 = this.shadowRoot.getElementById('backbutton2')
		const back3 = this.shadowRoot.getElementById('backbutton3')
		const back4 = this.shadowRoot.getElementById('backbutton4')
		const back5 = this.shadowRoot.getElementById('backbutton5')
		back.addEventListener('click', function () {
			submenuList.forEach(value => {
				value.classList.remove('submenu-active')
			})
			sideMenu.classList.add('menu-active') // 메인 메뉴 다시 열기
		})
		back2.addEventListener('click', function () {
			submenuList.forEach(value => {
				value.classList.remove('submenu-active')
			})
			sideMenu.classList.add('menu-active') // 메인 메뉴 다시 열기
		})
		back3.addEventListener('click', function () {
			submenuList.forEach(value => {
				value.classList.remove('submenu-active')
			})
			sideMenu.classList.add('menu-active') // 메인 메뉴 다시 열기
		})
		back4.addEventListener('click', function () {
			submenuList.forEach(value => {
				value.classList.remove('submenu-active')
			})
			sideMenu.classList.add('menu-active') // 메인 메뉴 다시 열기
		})
		back5.addEventListener('click', function () {
			submenuList.forEach(value => {
				value.classList.remove('submenu-active')
			})
			sideMenu.classList.add('menu-active') // 메인 메뉴 다시 열기
		})
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
