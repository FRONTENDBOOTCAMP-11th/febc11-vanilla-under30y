'use strict'
import axios from 'axios'

function Product(id, image, price, shippingFees, name, content, extra) {
	this.id = id
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

// 제품 정보와 해당 제품의 바리에이션
let product
let productOptions = []

// url, clientId hard coding
const url = 'https://11.fesp.shop'
const clientId = 'vanilla04'
// accessToken 가져오기
const accessToken = sessionStorage.getItem('accessToken')
// url에서 product_id 추출
const urlParams = new URLSearchParams(window.location.search)
const endPoint = `/products/${urlParams.get('product_id')}`

function fetchData(url, endPoint, clientId, accessToken) {
	return new Promise((resolve, reject) => {
		axios
			.get(url + endPoint, {
				headers: {
					'Content-Type': 'application/json',
					'client-id': clientId,
					Authorization: `Bearer ${accessToken}`
				},
				timeout: 5000
			})
			.then(response => {
				const productData = response.data.item
				resolve(productData)
			})
			.catch(error => {
				reject(error)
			})
	})
}
async function fetchProductData(url, endPoint, clientId, accessToken) {
	try {
		const productData = await fetchData(
			url,
			endPoint,
			clientId,
			accessToken
		)
		return productData
	} catch (error) {
		console.error('There was an error with the fetch request:', error)
	}
}

// 제품 정보가 출력될 dom node 객체 획득 - prodInfo
let prodTitleNode = document.getElementById('prodTitle')
let prodImageFrameNode = document.getElementById('prodImageFrame')
let prodImageColorNode = document.getElementById('prodImageColor')
let sizeSelectionNode = document.getElementById('sizeSelection')
let prodTextNode = document.getElementById('prodText')

fetchProductData(url, endPoint, clientId, accessToken).then(productData => {
	if (productData) {
		// productData를 활용한 작업 수행
		product = new Product(
			productData._id,
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
					productData.options[i]._id,
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
			prodGenderNode.setAttribute('style', 'font-weight:500;')
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
			let curPriceValue = product.price
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
			let curPriceNode = document.createElement('span')
			curPriceNode.setAttribute('id', 'curPrice')
			curPriceNode.setAttribute('style', 'margin-right: 8px')
			let curPriceTextNode = document.createTextNode(
				`${curPriceValue} 원`
			)
			curPriceNode.appendChild(curPriceTextNode)
			prodPriceNode.appendChild(curPriceNode)

			// 할인 중인 경우에만 표시
			if (product.price != product.extra.primeCost) {
				// 원가
				let prevPriceValue = product.extra.primeCost
					.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
			}
			prodTitleNode.appendChild(prodPriceNode)
		}

		//	제품 이미지 출력
		function printProductColorSelectImage(product) {
			// 초기 설정
			prodImageColorNode.innerHTML = `
			<div class="prodImageColorFrame selected" value = "0">
				<img src="${url}${product[0].image[0].path}" />
			</div>
			`
			for (let j = 0; j < product.length - 1; j++) {
				prodImageColorNode.innerHTML += `
					<div class="prodImageColorFrame" value = "${j + 1}">
						<img src="${url}${product[j + 1].image[0].path}" />
					</div>
				`
			}

			let $colorSelected = document
				.querySelector('.prodImageColorFrame.selected')
				.getAttribute('value')
			printProductImage(product, $colorSelected)
		}

		// 제품 선택시 이미지 교체
		function printProductImage(product, $colorSelected) {
			prodImageFrameNode.innerHTML = ''
			for (let i = 0; i < product[$colorSelected].image.length; i++) {
				prodImageFrameNode.innerHTML += `
					<img src="${url}${product[$colorSelected].image[i].path}" style="display: block"/>
				`
			}
			prodImageFrameNode.scrollLeft = 0
		}

		// 제품 설명 출력
		function printProductText(product, productOption, $colorSelected) {
			prodTextNode.innerHTML = `
				<p>
					${product.content}
				</p>
				<ul class="prodStyle">
					<li id="colorInfo">
						현재 컬러: ${productOption[$colorSelected].extra.color}
					</li>
					<li id="styleIdInfo">스타일 번호: ${productOption[$colorSelected].extra.styleNo}</li>
				</ul> 
				`
			printProdDetail(product.content, productOption[$colorSelected])
		}

		//사이즈 영역 생성 및 활성화/비활성화
		function printSizeArea(product, $colorSelected) {
			let size = product[$colorSelected].extra.size[0]
			sizeSelectionNode.innerHTML = ''
			if (typeof size === 'number') {
				let sizeLimit =
					(product[$colorSelected].extra.size[
						product[$colorSelected].extra.size.length - 1
					] -
						product[$colorSelected].extra.size[0]) /
					5
				for (let i = 0; i < sizeLimit + 1; i++) {
					let sizeNode = document.createElement('div')
					if (size === product[$colorSelected].extra.size[i]) {
						sizeNode.setAttribute('class', 'size')
						sizeNode.setAttribute('value', size)
					} else {
						sizeNode.setAttribute('class', 'size off')
						sizeNode.setAttribute('value', size)
					}
					let sizeTextNode = document.createTextNode(`${size}`)
					sizeNode.appendChild(sizeTextNode)
					sizeSelectionNode.appendChild(sizeNode)

					size += 5
				}
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

		// 배송비 정보
		function printShippingInfo(product) {
			let shippingFeeNode = document.getElementById('shippingFee')
			let shippingFeeTextNode
			if (product.shippingFees) {
				shippingFeeTextNode = document.createTextNode(
					`${product.shippingFees.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원`
				)
			} else {
				shippingFeeTextNode = document.createTextNode('무료 배송')
			}
			shippingFeeNode.appendChild(shippingFeeTextNode)
		}

		// 함수 실행
		printProductTitle(product)
		printProductColorSelectImage(productOptions)
		let $colorSelected = document
			.querySelector('.prodImageColorFrame.selected')
			.getAttribute('value')

		printSizeArea(productOptions, $colorSelected)
		printProductText(product, productOptions, $colorSelected)
		printShippingInfo(product)

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
					let $colorSelected = document
						.querySelector('.prodImageColorFrame.selected')
						.getAttribute('value')
					printProductImage(productOptions, $colorSelected)
					printSizeArea(productOptions, $colorSelected)
					printProductText(product, productOptions, $colorSelected)
					printProdDetail(
						product.content,
						productOptions[$colorSelected]
					)
				}
			})
		})

		// 장바구니 페이지
		function openBasketPage(e) {
			e.preventDefault()
			let $colorSelected = document
				.querySelector('.prodImageColorFrame.selected')
				.getAttribute('value')
			let $sizeSelected = document.querySelector('.size.selected')
			let $productSelected = productOptions[$colorSelected].id
			if (!$sizeSelected) {
				// 사이즈 선택을 하지 않았을 시 경고 문구
				alert('사이즈를 선택해주십시오.')
			} else if (!accessToken) {
				alert(
					'로그인 이후 이용할 수 있는 기능입니다. 로그인을 진행하여주십시오'
				)
				window.location.href = '../member/login.html'
			} else {
				createOrder(
					$productSelected,
					parseInt($sizeSelected).textContent
				)
			}
		}
		// 장바구니로 post 요청
		async function createOrder(product_id, size) {
			try {
				await createProductOrder(product_id, size)
				let isVisitBasket = confirm(
					'장바구니 추가 완료! 장바구니 페이지로 이동하시겠습니까?'
				)
				if (isVisitBasket)
					window.location.href = '../cart/prdBasket.html'
			} catch (error) {
				console.error('Error creating product order:', error)
			}
		}
		function createProductOrder(product_id, size) {
			return new Promise((resolve, reject) => {
				axios
					.post(
						`${url}/carts/`,
						{
							product_id,
							quantity: 1,
							size
						},
						{
							headers: {
								'Content-Type': 'application/json',
								'client-id': clientId,
								Authorization: `Bearer ${accessToken}`
							}
						}
					)
					.then(response => {
						resolve(response.data)
					})
					.catch(error => {
						reject(error)
					})
			})
		}

		// 장바구니 버튼 노드에 이벤트 추가
		let basketNode = document.getElementById('basket')
		let footerBasketNode = document.getElementById('footerBasket')
		basketNode.addEventListener('click', openBasketPage)
		footerBasketNode.addEventListener('click', openBasketPage)

		// 제품 상세 정보 보기 마크업
		function printProdDetail(description, product) {
			let productDetailContentNode = document.getElementById(
				'productDetailContent'
			)
			let productDetailDescriptionNode = document.getElementById(
				'productDetailDescription'
			)
			productDetailContentNode.innerHTML = `
			<img src="${url}${product.image[0].path}" />
					<span class="productDetailItem"> ${product.name} </span>
					<div class="prodPrice detailed">
						<span style="margin-right: 8px">
							${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
						</span>
						<span style="color: #9e9ea0; text-decoration-line: line-through; margin-right: 8px;">
							${product.extra.primeCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
						</span>
						<span id="salesRate" style="color: #007d48">
							${product.salesRate}% 할인
						</span>
					</div>
			`
			productDetailDescriptionNode.innerHTML = `${description}`
		}
	}
})
