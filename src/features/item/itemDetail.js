'use strict'

function Product(image, price, shippingFees, name, content, extra) {
	this.image = image
	this.price = price
	this.shippingFees = shippingFees
	this.name = name
	this.salesRate = parseInt(
		((extra.primeCost - price) / extra.primeCost) * 100
	)
	this.content = content
	this.extra = extra
}

// int 형식의 price/primeCost 변수 "xxx,xxx" 형태의 string으로 변환
function intToStringPrice(price) {
	switch ((price % 1000).toString().length) {
		case 3:
			return (
				parseInt(price / 1000).toString() +
				',' +
				parseInt(price % 1000).toString()
			)
		case 2:
			return (
				parseInt(price / 1000).toString() +
				',0' +
				parseInt(price % 1000).toString()
			)
		case 1:
			return (
				parseInt(price / 1000).toString() +
				',00' +
				parseInt(price % 1000).toString()
			)
	}
}

// 제품 정보 - 예시
// window.load 이벤트로 객체를 넘겨 받아 만들기?
let product
let productOptions = []

// 보안상 그리 좋지 않음. .bru 파일을 불러올 방법이 더 없을까?
const url = 'https://11.fesp.shop'
const clientId = 'vanilla04'
const accessToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjUsInR5cGUiOiJzZWxsZXIiLCJuYW1lIjoi7ZiE7KKFIiwiZW1haWwiOiJoakBuYXZlci5jb20iLCJpbWFnZSI6Ii9maWxlcy8wMC1zYW1wbGUvcHJvZmlsZS5qcGciLCJsb2dpblR5cGUiOiJlbWFpbCIsImlhdCI6MTcyOTY1NzQwMSwiZXhwIjoxNzI5NzQzODAxLCJpc3MiOiJGRVNQIn0.iXvoZy-NGcUCFPx3XfPCU3VwyfTvsHZ600cUWP7j-Uo'
const endPoint = '/products/1'

function fetchProductData(url, endPoint, clientId, accessToken) {
	return axios
		.get(url + endPoint, {
			headers: {
				'Content-Type': 'application/json',
				'client-id': clientId,
				Authorization: `Bearer ${accessToken}`
			},
			timeout: 5000
		})

		.then(response => {
			console.log(response.data.item)
			const productData = response.data.item // 응답 데이터에서 item을 추출
			return productData // productData를 반환
		})
		.catch(error => {
			console.error('There was an error with the fetch request:', error)
			return null // 에러 발생 시 null 반환
		})
}

// 제품 정보가 출력될 dom node 객체 획득 - prodInfo
let prodTitleNode = document.getElementById('prodTitle')
let prodImageFrameNode = document.getElementById('prodImageFrame')
let prodImageColorNode = document.getElementById('prodImageColor') //출력과 동시에 colorSelection의 입력 노드
let sizeSelectionNode = document.getElementById('sizeSelection') //출력과 동시에 sizeSelection의 입력 노드
let prodTextNode = document.getElementById('prodText')

// 제품의 추가 정보가 출력될 dom node 객체 획득 - prodMoreInfo
// let reviewProdNode = document.getElementById('reviewProd')

// 제품의 상세 정보가 출력될 dom node 객체 획득 - productDetail
let productDetailNode = document.getElementById('productDetail')

// function printReviewProduct(product) {

// }

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
prodImageColorNode.addEventListener('mousedown', e => {
	e.preventDefault()
	isMouseDown = true
	prodImageColorNode.classList.add('active')

	startX = e.pageX - prodImageColorNode.offsetLeft
	scrollLeft = prodImageColorNode.scrollLeft
})

prodImageColorNode.addEventListener('mouseleave', () => {
	isMouseDown = false
	prodImageColorNode.classList.remove('active')
})

prodImageColorNode.addEventListener('mouseup', () => {
	isMouseDown = false
	prodImageColorNode.classList.remove('active')
})

prodImageColorNode.addEventListener('mousemove', e => {
	if (!isMouseDown) return

	e.preventDefault()
	const x = e.pageX - prodImageColorNode.offsetLefts
	const walk = (x - startX) * 2
	prodImageColorNode.scrollLeft = scrollLeft - walk
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

// fetch가 완료된 후에만 productData 사용
fetchProductData(url, endPoint, clientId, accessToken).then(productData => {
	if (productData) {
		// productData를 활용한 작업 수행
		product = new Product(
			productData.mainImages,
			productData.price,
			productData.shippingFees,
			productData.name,
			productData.content,
			productData.extra
		)
		for (let i = 0; i < productData.options.length; i++) {
			productOptions.push(
				new Product(
					productData.options[i].mainImages,
					productData.options[i].price,
					productData.options[i].shippingFees,
					productData.options[i].name,
					productData.options[i].content,
					productData.options[i].extra
				)
			)
		}
		// 제품명, 가격, 분류 등을 출력
		function printProductTitle(product) {
			let prodNameNode = document.createElement('h1')
			prodNameNode.setAttribute('class', 'prodName')
			let prodNameTextNode = document.createTextNode(`${product.name}`)
			prodNameNode.appendChild(prodNameTextNode)
			prodTitleNode.appendChild(prodNameNode)

			let prodGenderNode = document.createElement('h2')
			prodGenderNode.setAttribute('class', 'prodGender')
			let prodGenderTextNode
			if (product.extra.gender === 'men') {
				prodGenderTextNode = document.createTextNode('남성 신발')
			} else {
				prodGenderTextNode = document.createTextNode('여성 신발')
			}

			prodGenderNode.appendChild(prodGenderTextNode)
			prodTitleNode.appendChild(prodGenderNode)

			let prodPriceNode = document.createElement('div')
			prodPriceNode.setAttribute('class', 'prodPrice')
			// 현재가 = 할인가
			let curPriceValue = intToStringPrice(product.price)
			let curPriceNode = document.createElement('span')
			curPriceNode.setAttribute('id', 'curPrice')
			curPriceNode.setAttribute('style', 'margin-right: 8px')
			let curPriceTextNode = document.createTextNode(
				`${curPriceValue} 원`
			)
			curPriceNode.appendChild(curPriceTextNode)
			prodPriceNode.appendChild(curPriceNode)

			// 원가
			let prevPriceValue = intToStringPrice(product.extra.primeCost)
			let prevPriceNode = document.createElement('span')
			prevPriceNode.setAttribute('id', 'prevPrice')
			prevPriceNode.setAttribute(
				'style',
				'color: #9e9ea0; text-decoration-line: line-through;margin-right: 8px;'
			)
			let prevPriceTextNode = document.createTextNode(
				`${prevPriceValue} 원`
			)
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
		function printProductColorSelectImage(product) {
			// 초기 설정
			let prodImageColorFrameNode = document.createElement('div')
			prodImageColorFrameNode.setAttribute(
				'class',
				'prodImageColorFrame selected'
			)
			prodImageColorFrameNode.setAttribute('value', 0)
			let prodImageColorImgNode = document.createElement('img')
			prodImageColorImgNode.setAttribute(
				'src',
				`${url}${product[0].image[0].path}`
			)
			prodImageColorFrameNode.appendChild(prodImageColorImgNode)
			prodImageColorNode.appendChild(prodImageColorFrameNode)
			for (let j = 0; j < product.length - 1; j++) {
				let prodImageColorFrameNode = document.createElement('div')
				prodImageColorFrameNode.setAttribute(
					'class',
					'prodImageColorFrame'
				)
				prodImageColorFrameNode.setAttribute('value', `${j + 1}`)
				let prodImageColorImgNode = document.createElement('img')
				prodImageColorImgNode.setAttribute(
					'src',
					`${url}${product[j + 1].image[0].path}`
				)
				prodImageColorFrameNode.appendChild(prodImageColorImgNode)
				prodImageColorNode.appendChild(prodImageColorFrameNode)
			}
			printProductImage(product)
		}

		function printProductImage(product) {
			prodImageFrameNode.innerHTML = ''
			let $selected = document
				.querySelector('.prodImageColorFrame.selected')
				.getAttribute('value')

			for (let i = 0; i < product[$selected].image.length; i++) {
				let imageNode = document.createElement('img')
				imageNode.setAttribute(
					'src',
					`${url}${product[$selected].image[i].path}`
				)
				imageNode.setAttribute('style', 'display: block')
				prodImageFrameNode.appendChild(imageNode)
			}
		}
		//제품 설명 출력
		function printProductText(product, productOption) {
			prodTextNode.innerHTML = ''
			let $selected = document
				.querySelector('.prodImageColorFrame.selected')
				.getAttribute('value')

			let prodDescriptNode = document.createElement('p')
			let prodDescriptTextNode = document.createTextNode(
				`${product.content}`
			)
			prodDescriptNode.appendChild(prodDescriptTextNode)
			prodTextNode.appendChild(prodDescriptNode)

			let prodListNode = document.createElement('ul')
			prodListNode.setAttribute('class', 'prodStyle')
			let prodListColorNode = document.createElement('li')
			prodListColorNode.setAttribute('id', 'colorInfo')
			let prodListColorTextNode = document.createTextNode(
				`현재 컬러: ${productOption[$selected].extra.color}`
			)
			prodListColorNode.appendChild(prodListColorTextNode)
			let prodListStyleNode = document.createElement('li')
			prodListStyleNode.setAttribute('id', 'styleIdInfo')
			let prodListStyleTextNode = document.createTextNode(
				`스타일 번호: ${productOption[$selected].extra.styleNo}`
			)
			prodListStyleNode.appendChild(prodListStyleTextNode)
			prodListNode.appendChild(prodListColorNode)
			prodListNode.appendChild(prodListStyleNode)
			prodTextNode.appendChild(prodListNode)
		}
		//사이즈 영역 생성 및 활성화/비활성화
		function printSizeArea(product) {
			let $selected = document
				.querySelector('.prodImageColorFrame.selected')
				.getAttribute('value')
			let size = product[$selected].extra.size[0]

			let i = 0
			sizeSelectionNode.innerHTML = ''
			while (i < product[$selected].extra.size.length) {
				let sizeNode = document.createElement('div')
				if (size === product[$selected].extra.size[i]) {
					sizeNode.setAttribute('class', 'size')
					sizeNode.setAttribute('value', size)
					i++
				} else {
					sizeNode.setAttribute('class', 'size off')
					sizeNode.setAttribute('value', size)
				}
				let sizeTextNode = document.createTextNode(`${size}`)
				sizeNode.appendChild(sizeTextNode)
				sizeSelectionNode.appendChild(sizeNode)
				size += 5
			}
			// 사이즈 선택 이벤트
			const sizeSelection = document.querySelectorAll('.size')
			sizeSelection.forEach(item => {
				item.addEventListener('click', () => {
					// 이미 선택된 사이즈거나 존재하지 않는 사이즈에 대해서는 반응 x
					if (
						item.classList[1] === 'selected' ||
						item.classList[1] === 'off'
					) {
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
		}
		function printShippingInfo(product) {
			let shippingFeeNode = document.getElementById('shippingFee')
			let shippingFeeTextNode
			if (product.shippingFees) {
				shippingFeeTextNode = document.createTextNode(
					`${intToStringPrice(product.shippingFees)} 원`
				)
			} else {
				shippingFeeTextNode = document.createTextNode('무료 배송')
			}
			shippingFeeNode.appendChild(shippingFeeTextNode)
		}

		// 이 아래에 함수 실행 부분은 색상 선택과 연관지을 것
		printProductTitle(product)
		if (productOptions) {
			printProductColorSelectImage(productOptions)
		} else {
			printProductColorSelectImage(product)
		}

		printSizeArea(productOptions)
		printProductText(product, productOptions)
		printShippingInfo(product)

		// 제품의 다른 사이즈 선택 시각적 효과

		// 제품의 다른 색상 선택 시각적 효과
		const $productColors = document.querySelectorAll('.prodImageColorFrame')

		$productColors.forEach(item => {
			item.addEventListener('click', () => {
				// 이미 선택된 색상에 대해서는 반응 x
				if (item.classList[1] === 'selected') {
					return
				} else {
					// 한 요소만 선택되도록 모든 요소 초기화 후 진행
					$productColors.forEach(el => {
						el.classList.remove('selected')
					})
					item.classList.add('selected')
					printProductImage(productOptions)
					printSizeArea(productOptions)
					printProductText(product, productOptions)
				}
			})
		})
	}
})
