'use strict'

function Product(
	id,
	image,
	price,
	shippingFees,
	name,
	category,
	content,
	extra
) {
	this.id = id
	this.image = image
	this.extra = extra
	this.price = price
	this.shippingFees = shippingFees
	this.name = name
	this.category = category
	this.salesRate = parseInt((price / extra.primeCost) * 100)
	this.content = content
}

function Extra(parentId, size, color, primeCost, styleNo) {
	this.parentId = parentId
	this.size = size
	this.color = color
	this.primeCost = primeCost
	this.styleNo = styleNo
}

// 제품 정보 - 예시
// window.load 이벤트로 객체를 넘겨 받아 만들기?
let extra1 = new Extra(
	1,
	[220, 225, 230, 235, 240, 245, 250, 255, 260, 280, 295],
	'다크 드리프트우드/헴프/세일/블랙',
	249000,
	'FN0314-200'
)
let product = new Product(
	2,
	[
		'shoes1.png',
		'shoes2.png',
		'shoes3.png',
		'shoes4.png',
		'shoes5.png',
		'shoes6.png',
		'shoes7.png',
		'shoes8.png',
		'shoes9.png'
	],
	149000,
	3500,
	'테이텀 2 PF',
	'농구화',
	'경기 종료 휘슬이 울릴 때까지는 끝난 것이 아닙니다. 테이텀 2와 함께 여유로운 에너지로 경기를 즐겨보세요. 무거운 고무 소재의 사용을 제한하여 더욱 가벼운 착화감을 선사합니다. 전체적으로 적용된 나이키 에어스트로벨 유닛은 빠르게 방향을 바꿀 수 있도록 도와주며, 견고한 프레임과 발에 밀착되는 지지력 있는 폼이 어우러져 고정력 좋은 착화감을 선사합니다.',
	extra1
)

// 제품 정보가 출력될 dom node 객체 획득 - prodInfo
let prodTitleNode = document.getElementById('prodTitle')
let prodImageFrameNode = document.getElementById('prodImageFrame')
let prodImageColorNode = document.getElementById('prodImageColor') //출력과 동시에 colorSelection의 입력 노드
let sizeSelectionNode = document.getElementById('sizeSelection') //출력과 동시에 sizeSelection의 입력 노드
let prodTextNode = document.getElementById('prodText')

// 제품의 추가 정보가 출력될 dom node 객체 획득 - prodMoreInfo
let shippingInfoNode = document.getElementById('shippingInfo')
let reviewProdNode = document.getElementById('reviewProd')

// 제품의 상세 정보가 출력될 dom node 객체 획득 - productDetail
let productDetailNode = document.getElementById('productDetail')

// 제품명, 가격, 분류 등을 출력
function printProductTitle(product) {
	let prodNameNode = document.createElement('h1')
	prodNameNode.setAttribute('class', 'prodName')
	let prodNameTextNode = document.createTextNode(`${product.name}`)
	prodNameNode.appendChild(prodNameTextNode)
	prodTitleNode.appendChild(prodNameNode)

	let prodCategoryNode = document.createElement('h2')
	prodCategoryNode.setAttribute('class', 'prodCategory')
	let prodCategoryTextNode = document.createTextNode(`${product.category}`)
	prodCategoryNode.appendChild(prodCategoryTextNode)
	prodTitleNode.appendChild(prodCategoryNode)

	let prodPriceNode = document.createElement('div')
	prodPriceNode.setAttribute('class', 'prodPrice')
	// 현재가 = 할인가
	let curPriceValue
	switch ((product.price % 1000).toString().length) {
		case 3:
			curPriceValue =
				parseInt(product.price / 1000).toString() +
				',' +
				parseInt(product.price % 1000).toString()
			break
		case 2:
			curPriceValue =
				parseInt(product.price / 1000).toString() +
				',0' +
				parseInt(product.price % 1000).toString()
			break
		case 1:
			curPriceValue =
				parseInt(product.price / 1000).toString() +
				',00' +
				parseInt(product.price % 1000).toString()
			break
	}
	let curPriceNode = document.createElement('span')
	curPriceNode.setAttribute('id', 'curPrice')
	curPriceNode.setAttribute('style', 'margin-right: 8px')
	let curPriceTextNode = document.createTextNode(`${curPriceValue} 원`)
	curPriceNode.appendChild(curPriceTextNode)
	prodPriceNode.appendChild(curPriceNode)

	// 원가
	let prevPriceValue
	switch ((product.extra.primeCost % 1000).toString().length) {
		case 3:
			prevPriceValue =
				parseInt(product.extra.primeCost / 1000).toString() +
				',' +
				parseInt(product.extra.primeCost % 1000).toString()
			break
		case 2:
			prevPriceValue =
				parseInt(product.extra.primeCost / 1000).toString() +
				',0' +
				parseInt(product.extra.primeCost % 1000).toString()
			break
		case 1:
			prevPriceValue =
				parseInt(product.extra.primeCost / 1000).toString() +
				',00' +
				parseInt(product.extra.primeCost % 1000).toString()
			break
	}
	let prevPriceNode = document.createElement('span')
	prevPriceNode.setAttribute('id', 'prevPrice')
	prevPriceNode.setAttribute(
		'style',
		'color: #9e9ea0; text-decoration-line: line-through;margin-right: 8px;'
	)
	let prevPriceTextNode = document.createTextNode(`${prevPriceValue} 원`)
	prevPriceNode.appendChild(prevPriceTextNode)
	prodPriceNode.appendChild(prevPriceNode)

	// 할인율
	let salesRateNode = document.createElement('span')
	salesRateNode.setAttribute('id', 'salesRate')
	salesRateNode.setAttribute('style', 'color: #007d48')
	let salesRateTextNode = document.createTextNode(
		`${product.salesRate}% 할인`
	)
	salesRateNode.appendChild(salesRateTextNode)
	prodPriceNode.appendChild(salesRateNode)

	prodTitleNode.appendChild(prodPriceNode)
}

//제품 이미지 출력
function printProductImage(product) {
	for (let i = 0; i < product.image.length; i++) {
		let imageNode = document.createElement('img')
		imageNode.setAttribute('src', `../../assets/item/${product.image[i]}`)
		imageNode.setAttribute('style', 'display: block')
		prodImageFrameNode.appendChild(imageNode)
	}
}

//제품 설명 출력
function printProductText(product) {
	let prodDescriptNode = document.createElement('p')
	let prodDescriptTextNode = document.createTextNode(`${product.content}`)
	prodDescriptNode.appendChild(prodDescriptTextNode)
	prodTextNode.appendChild(prodDescriptNode)

	let prodListNode = document.createElement('ul')
	prodListNode.setAttribute('class', 'prodStyle')
	let prodListColorNode = document.createElement('li')
	prodListColorNode.setAttribute('id', 'colorInfo')
	let prodListColorTextNode = document.createTextNode(
		`현재 컬러: ${product.extra.color}`
	)
	prodListColorNode.appendChild(prodListColorTextNode)
	let prodListStyleNode = document.createElement('li')
	prodListStyleNode.setAttribute('id', 'styleIdInfo')
	let prodListStyleTextNode = document.createTextNode(
		`스타일 번호: ${product.extra.styleNo}`
	)
	prodListStyleNode.appendChild(prodListStyleTextNode)
	prodListNode.appendChild(prodListColorNode)
	prodListNode.appendChild(prodListStyleNode)
	prodTextNode.appendChild(prodListNode)
}

//사이즈 영역 생성 및 활성화/비활성화
function showSizeArea(product) {
	let size = product.extra.size[0]
	let i = 0
	while (i < product.extra.size.length) {
		let sizeNode = document.createElement('div')
		if (size === product.extra.size[i]) {
			sizeNode.setAttribute('class', 'size')
			i++
		} else {
			sizeNode.setAttribute('class', 'size off')
		}
		let sizeTextNode = document.createTextNode(`${size}`)
		sizeNode.appendChild(sizeTextNode)
		sizeSelectionNode.appendChild(sizeNode)
		size += 5
	}
}

printProductTitle(product)
printProductImage(product)
printProductText(product)
showSizeArea(product)

// 이미지 슬라이더
// const imageSlider = document.getElementById('prodImageFrame')

// let isMouseDown = false
// let startX, scrollLeft

// imageSlider.addEventListener('mousedown', e => {
// 	e.preventDefault()
// 	isMouseDown = true
// 	imageSlider.classList.add('active')

// 	startX = e.pageX - imageSlider.offsetLeft
// 	scrollLeft = imageSlider.scrollLeft
// })

// imageSlider.addEventListener('mouseleave', () => {
// 	isMouseDown = false
// 	imageSlider.classList.remove('active')
// })

// imageSlider.addEventListener('mouseup', () => {
// 	isMouseDown = false
// 	imageSlider.classList.remove('active')
// })

// imageSlider.addEventListener('mousemove', e => {
// 	if (!isMouseDown) return

// 	e.preventDefault()
// 	const x = e.pageX - imageSlider.offsetLeft
// 	const walk = (x - startX) * 2
// 	imageSlider.scrollLeft = scrollLeft - walk
// })

// imageSlider.addEventListener('mousedown', e => {
// 	e.preventDefault()
// 	isMouseDown = true
// 	imageSlider.classList.add('active')

// 	startX = e.pageX - imageSlider.offsetLeft
// 	scrollLeft = imageSlider.scrollLeft
// })

// 색상 선택 슬라이더

// const colorSlider = document.getElementById('prodImageColor')

// colorSlider.addEventListener('mousedown', e => {
// 	e.preventDefault()
// 	isMouseDown = true
// 	colorSlider.classList.add('active')

// 	startX = e.pageX - colorSlider.offsetLeft
// 	scrollLeft = colorSlider.scrollLeft
// })

// colorSlider.addEventListener('mouseleave', () => {
// 	isMouseDown = false
// 	colorSlider.classList.remove('active')
// })

// colorSlider.addEventListener('mouseup', () => {
// 	isMouseDown = false
// 	colorSlider.classList.remove('active')
// })

// colorSlider.addEventListener('mousemove', e => {
// 	if (!isMouseDown) return

// 	e.preventDefault()
// 	const x = e.pageX - colorSlider.offsetLefts
// 	const walk = (x - startX) * 2
// 	colorSlider.scrollLeft = scrollLeft - walk
// })

// 제품의 다른 색상 선택 시각적 효과, api 관련된 이벤트도 추가할 수 있음
// const productColors = document.querySelectorAll('.prodImageColorFrame')

// productColors.forEach(item => {
// 	item.addEventListener('click', () => {
// 		// 이미 선택된 색상에 대해서는 반응 x
// 		if (item.classList[1] === 'selected') {
// 			return
// 		} else {
// 			// 한 요소만 선택되도록 모든 요소 초기화 후 진행
// 			productColors.forEach(el => {
// 				el.classList.remove('selected')
// 			})
// 			item.classList.add('selected')
// 			const Frame = document.getElementById('prodImageFrame')
// 			Frame.childNodes[1].setAttribute(
// 				'src',
// 				`${item.childNodes[1].getAttribute('src')}`
// 			)
// 		}
// 	})
// })

// 추천 상품 슬라이더

// const recommendedSlider = document.getElementById('recommendedItemsSection')

// recommendedSlider.addEventListener('mousedown', e => {
// 	e.preventDefault()
// 	isMouseDown = true
// 	recommendedSlider.classList.add('active')

// 	startX = e.pageX - recommendedSlider.offsetLeft
// 	scrollLeft = recommendedSlider.scrollLeft
// })

// recommendedSlider.addEventListener('mouseleave', () => {
// 	isMouseDown = false
// 	recommendedSlider.classList.remove('active')
// })

// recommendedSlider.addEventListener('mouseup', () => {
// 	isMouseDown = false
// 	recommendedSlider.classList.remove('active')
// })

// recommendedSlider.addEventListener('mousemove', e => {
// 	if (!isMouseDown) return

// 	e.preventDefault()
// 	const x = e.pageX - recommendedSlider.offsetLeft
// 	const walk = (x - startX) * 2
// 	recommendedSlider.scrollLeft = scrollLeft - walk
// })

// 리뷰 작성 페이지 열기
// document.querySelector('.writeReview').addEventListener('click', () => {
// 	window.open(
// 		'writeReview.html',
// 		'_blank',
// 		'top = 10, left = 10, width = 345 height = 700'
// 	)
// })

// 제품 상세 정보 보기 페이지 토글 용
// const showModal = document.querySelector('.prodDetail')

// showModal.addEventListener('click', () => {
// 	document.getElementById('background').classList.add('show-background')
// 	document.getElementById('productDetail').classList.add('show-modal')
// })

// const hideModal = [
// 	document.querySelector('.background'),
// 	document.querySelector('.closeButton')
// ]

// hideModal.forEach(item => {
// 	item.addEventListener('click', () => {
// 		document
// 			.getElementById('background')
// 			.classList.remove('show-background')
// 		document.getElementById('productDetail').classList.remove('show-modal')
// 	})
// })

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
