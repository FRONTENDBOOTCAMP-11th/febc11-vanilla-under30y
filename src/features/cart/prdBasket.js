'use strict'
import axios from 'axios'

const url = 'https://11.fesp.shop'
const clientId = 'vanilla04'
// accessToken 가져오기
const accessToken = sessionStorage.getItem('accessToken')
// url에서 product_id 추출
const endPoint = `/carts/`

function getProductData(url, endPoint, clientId, accessToken) {
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

// 초기 장바구니 데이터 설정
async function getBasket(url, endPoint, clientId, accessToken) {
	try {
		const data = await getProductData(url, endPoint, clientId, accessToken)
		let basket = []
		for (let i = 0; i < data.length; i++) {
			basket.push({
				productName: data[i].product.name,
				price: data[i].product.price,
				quantity: 1,
				imageSrc: `${url}${data[i].product.image.path}`
			})
		}
		return basket
	} catch (error) {
		console.error('There was an error with the fetch request:', error)
	}
}

// 위시리스트 설정
let wishlist = [
	{
		productName: '나이키 줌 보메로 5',
		price: 189000,
		imageSrc: '../../assets/images/item/shoes.png'
	}
]

// 장바구니 렌더링 함수
getBasket(url, endPoint, clientId, accessToken).then(basket => {
	function renderBasket() {
		const productInfoContainer = document.querySelector(
			'.product-info-container'
		)
		productInfoContainer.innerHTML = '' // 기존 항목 초기화

		if (basket.length === 0) {
			productInfoContainer.innerHTML = `<p class="empty-cart">장바구니가 비어 있습니다.</p>`
		} else {
			basket.forEach((item, index) => {
				productInfoContainer.innerHTML += `
     	<div class="product-details" data-index="${index}">
        <!-- 사진은 왼쪽에 정렬해야 하기때문에 html 구조또한 왼쪽에 배치 -->
          <div class="product-image-section">
		    <div class="product-image">
              <img src="${item.imageSrc}" alt="${item.productName}" class="product-image"/>
            </div>
		  </div>
        
          <!--
          product-details에 flex-direction: row 가 적용이 되어있다
          세로로 정렬되어야 하는 해당 요소들은 별도의 태그로 감싸야한다.
          -->
        <div>
          <div class="product-header">
            <p class="product-price">${item.price.toLocaleString()} 원</p>
            <p class="product-name">${item.productName}</p>
          </div>
          <p class="product-category">남성 신발</p>
             <div class="product-info2">
            <div class="product-size">
              사이즈
              <span class="size-value">275</span>
            </div>
            <div class="product-amount">
              수량
              <span class="icon-minus" data-action="decrease" data-index="${index}">-</span>
              <span class="count-number">${item.quantity}</span>
              <span class="icon-plus" data-action="increase" data-index="${index}">+</span>
            </div>
          </div>
            <div class="product-icons">
            <img src="/icons/carticon/likeIcon.svg" alt="관심 상품" class="icon-heart" data-action="toggleFavorite" data-index="${index}" />
            <img src="/icons/carticon/deleteIcon.png" alt="삭제" class="icon-delete" data-action="delete" data-index="${index}" />
          </div>
        </div>   
                              
        </div>
      `
			})
		}

		updateOrderSummary()
		updateProductCount()
		toggleOrderButton()
		attachEventListeners()
	}

	// 주문 요약 업데이트 함수
	function updateOrderSummary() {
		const totalPrice = basket.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0
		)
		document.querySelector(
			'.summary-total .order-product-price'
		).textContent = `${totalPrice.toLocaleString()} 원`

		// 장바구니가 비어 있을 때 상품 금액을 0 원으로 표시
		if (basket.length === 0) {
			document.querySelector(
				'.summary-row .order-product-price'
			).textContent = '0 원'
		} else {
			document.querySelector(
				'.summary-row .order-product-price'
			).textContent = `${totalPrice.toLocaleString()} 원`
		}
	}

	// 장바구니 상품 수를 업데이트하는 함수
	function updateProductCount() {
		const productCountText = document.querySelector('.count-product')
		const productCount = basket.length

		if (productCount === 0) {
			productCountText.textContent = '0 개의 제품 |'
			document.querySelector('.product-price').textContent = '-'
		} else {
			const totalPrice = basket.reduce(
				(acc, item) => acc + item.price * item.quantity,
				0
			)
			productCountText.textContent = `${productCount} 개의 제품 |`
			document.querySelector('.product-price').textContent =
				`${totalPrice.toLocaleString()} 원`
		}
	}

	// 장바구니가 비었을 때 주문 버튼 비활성화
	function toggleOrderButton() {
		const orderButton = document.querySelector('.order-button')
		if (basket.length === 0) {
			orderButton.style.backgroundColor = '#cccccc'
			orderButton.style.cursor = 'not-allowed'
			orderButton.removeEventListener('click', handleOrder)
		} else {
			orderButton.style.backgroundColor = '#111111'
			orderButton.style.cursor = 'pointer'
			orderButton.addEventListener('click', handleOrder)
		}
	}

	// 주문 버튼 클릭 시 처리할 함수
	function handleOrder() {
		alert('주문이 완료되었습니다.')
	}

	// 수량 변경 함수
	function updateQuantity(index, action) {
		if (action === 'increase') {
			basket[index].quantity += 1
		} else if (action === 'decrease' && basket[index].quantity > 1) {
			basket[index].quantity -= 1
		}
		renderBasket()
	}

	// 상품 삭제 함수
	function deleteProduct(index) {
		basket.splice(index, 1)
		renderBasket()
	}

	// 주문 내역에 상품 금액 위에 있는 물음표 태그 이벤트
	document.addEventListener('DOMContentLoaded', function () {
		const subtotalIcon = document.querySelector('.subtotalDetail')
		const tooltip = document.querySelector('.tooltip')

		subtotalIcon.addEventListener('mouseover', function () {
			tooltip.style.display = 'block'
		})

		subtotalIcon.addEventListener('mouseout', function () {
			tooltip.style.display = 'none'
		})

		renderBasket()
		toggleOrderButton() // 주문 버튼 초기 설정
	})

	// 위시리스트에서 장바구니에 상품 추가 함수
	function addToBasketFromWishlist(item) {
		const found = basket.find(
			product => product.productName === item.productName
		)
		if (!found) {
			basket.push({ ...item, quantity: 1 })
			renderBasket()
		}
	}

	// 동적 요소에 이벤트 리스너 추가
	function attachEventListeners() {
		document.querySelectorAll('.icon-plus').forEach(button =>
			button.addEventListener('click', e => {
				const index = parseInt(e.target.getAttribute('data-index'))
				updateQuantity(index, 'increase')
			})
		)

		document.querySelectorAll('.icon-minus').forEach(button =>
			button.addEventListener('click', e => {
				const index = parseInt(e.target.getAttribute('data-index'))
				updateQuantity(index, 'decrease')
			})
		)

		document.querySelectorAll('.icon-delete').forEach(button =>
			button.addEventListener('click', e => {
				const index = parseInt(e.target.getAttribute('data-index'))
				deleteProduct(index)
			})
		)

		document.querySelectorAll('.addCart-button').forEach((button, index) =>
			button.addEventListener('click', () => {
				addToBasketFromWishlist(wishlist[index])
			})
		)
	}

	// 주문 내역에 상품 금액 위에 있는 물음표 태그 이벤트
	document.addEventListener('DOMContentLoaded', function () {
		renderBasket()
		toggleOrderButton() // 주문 버튼 초기 설정
	})
	renderBasket()
})
