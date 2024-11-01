import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				index: 'index.html', // 기본 index.html
				login: 'src/features/member/login.html', // 추가 HTML 파일
				signup: 'src/features/member/signup.html', // 추가 HTML 파일
				item_detail: 'src/features/item/itemDetail.html', // 추가 HTML 파일
				item_list: 'src/features/item/itemList.html',
				cart: 'src/features/cart/prdBasket.html',
				review: 'src/features/item/writeReview.html'
				// 필요한 다른 HTML 파일을 여기에 추가
			}
		}
	}
})
