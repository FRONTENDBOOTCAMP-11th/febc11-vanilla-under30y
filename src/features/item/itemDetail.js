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

// 제품의 상세 정보가 출력될 dom node 객체 획득 - productDetail
let productDetailNode = document.getElementById('productDetail')

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

		function printProductImage(product, $colorSelected) {
			prodImageFrameNode.innerHTML = ''

			for (let i = 0; i < product[$colorSelected].image.length; i++) {
				prodImageFrameNode.innerHTML += `
					<img
						src="${url}${product[$colorSelected].image[i].path}"
						style="display: block"
					/>
				`
			}
		}
		//제품 설명 출력
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
		}
		//사이즈 영역 생성 및 활성화/비활성화
		function printSizeArea(product, $colorSelected) {
			let size = product[$colorSelected].extra.size[0]
			sizeSelectionNode.innerHTML = ''
			if (typeof size === 'number') {
				// 중간 사이즈가 없어도 비활성화한 상태로 노드 작성
				let sizeLimit =
					(product[$colorSelected].extra.size[
						product[$colorSelected].extra.size.length - 1
					] -
						product[$colorSelected].extra.size[0]) /
						5 +
					1
				console.log(sizeLimit)
				for (let i = 0; i < sizeLimit; i++) {
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
			} else if (typeof size === 'string') {
				let stringSize = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']
				let j = 0
				for (let i = 0; i < 7; i++) {
					let sizeNode = document.createElement('div')
					if (
						stringSize[i] === product[$colorSelected].extra.size[j]
					) {
						sizeNode.setAttribute('class', 'size')
						sizeNode.setAttribute('value', stringSize[i])
						j++
					} else {
						sizeNode.setAttribute('class', 'size off')
						sizeNode.setAttribute('value', stringSize[i])
					}
					let sizeTextNode = document.createTextNode(
						`${stringSize[i]}`
					)
					sizeNode.appendChild(sizeTextNode)
					sizeSelectionNode.appendChild(sizeNode)
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
				}
			})
		})
	}
})
