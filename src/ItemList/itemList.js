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

class NikeFooter extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
		const template = document.getElementById('nike-footer')
		const clone = template.content.cloneNode(true)
		this.shadowRoot.appendChild(clone)
	}
}

// 상단 내비게이션 바 드래그
const navi = document.getElementById('navi')
navi.onclick = () => {
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
}

// 필터 메뉴
// Action Sheet 보이기
const showFilter = document.getElementById('filter-show')
const hideFilter = document.getElementById('filter-hide')
showFilter.onclick = () => {
	const filter = document.getElementById('filter')
	filter.classList.add('active')
}
hideFilter.onclick = () => {
	const filter = document.getElementById('filter')
	filter.classList.remove('active')
}

// 상품 전체 개수 세는 함수
function countAllProduct(data) {
	let productCount = document.getElementById('product-count')
	productCount.innerText = `${data}개의 결과`
}

// api 접속
const ApiUrl = 'https://11.fesp.shop'
const ClientId = 'vanilla04'
let xhr = new XMLHttpRequest()

xhr.open('get', `${ApiUrl}/products`, true)
xhr.setRequestHeader('client-id', `${ClientId}`)
xhr.send()
xhr.onload = function () {
	if (xhr.status === 200) {
		let data = JSON.parse(xhr.responseText)
		countAllProduct(data.item.length) // 상품 전체 개수 결과 도출
		dataDivide(data) // 상품 분류
	}
}

// 상품 표시에 필요한 값들을 각 배열에 저장하는 함수
function dataDivide(data) {
	const imgList = [],
		isNewList = [],
		nameList = [],
		genderList = [],
		colorList = [],
		priceList = []
	for (let i = 0; i < data.item.length; i++) {
		imgList.push(data.item[i].mainImages[0].path)
		isNewList.push(data.item[i].extra.isNew)
		nameList.push(data.item[i].name)
		genderList.push(data.item[i].extra.gender)
		colorList.push(data.item[i].extra.category.length)
		priceList.push(data.item[i].price)
	}
	addDocument(imgList, isNewList, nameList, genderList, colorList, priceList)
}

function addDocument(img, isNew, name, gender, color, price) {
	// 전체를 감쌀 div
	const productWrapper = document.getElementById('product-list')
	for (let i = 0; i < img.length; i++) {
		// 여기서 inside-product 3개를 넣어야함
		// wrapperDiv는 상품 하나하나를 감싼 div
		const wrapperDiv = document.createElement('div')
		wrapperDiv.classList.add('content__product-list--inside-product')

		// 이미지 삽입은 함수로 분류
		const productImg = addProductImg(img[i])

		// 내용 삽입은 함수로 분류
		const productInfo = addProductContent(
			isNew[i],
			name[i],
			gender[i],
			color[i],
			price[i]
		)
		// 합체
		wrapperDiv.appendChild(productImg)
		wrapperDiv.appendChild(productInfo)
		productWrapper.appendChild(wrapperDiv)
	}
}

function addProductImg(img) {
	// imgWrapperDiv는 이미지가 있는 부분을 감싼 div
	const imgWrapperDiv = document.createElement('div')
	imgWrapperDiv.classList.add('content__product-list--inside-product-img')
	const productImg = document.createElement('img')
	productImg.setAttribute('src', `${ApiUrl}${img}`)
	productImg.setAttribute('alt', '상품 이미지')
	imgWrapperDiv.appendChild(productImg)
	return imgWrapperDiv
}

function addProductContent(isNew, name, gender, color, price) {
	// 상품 설명 전체를 감싸는 div
	const prdCntDiv = document.createElement('div')
	prdCntDiv.classList.add('content__product-list--inside-product-explain')
	// 신제품 판단
	const newProduct = document.createElement('p')
	newProduct.classList.add('content__product-list--inside-product-explain')
	newProduct.classList.add('new')
	if (isNew == true) {
		newProduct.appendChild(document.createTextNode('신제품'))
	}
	// 상품 이름 추가
	const productName = document.createElement('p')
	productName.classList.add('content__product-list--inside-product-explain')
	productName.classList.add('product-name')
	productName.appendChild(document.createTextNode(name))
	// 남성, 여성 분류
	const productGender = document.createElement('p')
	productGender.classList.add('content__product-list--inside-product-explain')
	productGender.classList.add('product-category')
	if (gender == 'men') {
		productGender.appendChild(document.createTextNode('남성 신발'))
	} else if (gender == 'women') {
		productGender.appendChild(document.createTextNode('여성 신발'))
	}
	// 색상 분류
	const productColor = document.createElement('p')
	productColor.classList.add('content__product-list--inside-product-explain')
	productColor.classList.add('product-color')
	productColor.appendChild(document.createTextNode(`${color}개 색상`))
	// 가격 책정
	const productPrice = document.createElement('p')
	productPrice.classList.add('content__product-list--inside-product-explain')
	productPrice.classList.add('product-price')
	productPrice.appendChild(
		document.createTextNode(
			`${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원`
		)
	)
	// 합체
	prdCntDiv.append(
		newProduct,
		productName,
		productGender,
		productColor,
		productPrice
	)

	return prdCntDiv
}

customElements.define('nike-header', NikeHeader)
customElements.define('nike-footer', NikeFooter)
